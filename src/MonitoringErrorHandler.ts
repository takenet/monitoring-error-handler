import { AppInsights } from 'applicationinsights-js';
import * as Sentry from '@sentry/browser';

interface InitializeConfigurations {
  applicationInsights?: {
    instrumentationKey: string,
    applicationName?:string,
  };
  sentry?: {
    dsn: string;
    environment: string;
  };
}

export class MonitoringErrorHandler {
  private static Instance: MonitoringErrorHandler;
  public hasInitialized: any;
  private configurations: InitializeConfigurations;

  private constructor() {
    if (MonitoringErrorHandler.Instance) {
      throw new Error(
        'MonitoringErrorHandler is a singleton class. Use getInstance() method instead'
      );
    }
  }

  public static get instance(): MonitoringErrorHandler {
    MonitoringErrorHandler.Instance =
      MonitoringErrorHandler.Instance || new MonitoringErrorHandler();
    return MonitoringErrorHandler.Instance;
  }

  public initialize(configurations: InitializeConfigurations) {
    this.configurations = configurations;

    if (!this.hasInitialized) {
      // Application Insights
      if (AppInsights.downloadAndSetup && configurations.applicationInsights) {
        AppInsights.downloadAndSetup({
          instrumentationKey: configurations.applicationInsights.instrumentationKey,
        });

        if (configurations.applicationInsights.applicationName) {
          AppInsights.queue.push(() => {
            AppInsights.context.addTelemetryInitializer((evelope) => {
              evelope.tags['ai.cloud.role'] = configurations.applicationInsights.applicationName;
            });
          });
        }
      }

      // Sentry
      if (configurations.sentry) {
        Sentry.init({
          dsn: configurations.sentry.dsn,
          environment: configurations.sentry.environment,
        });
      }
    }

    this.hasInitialized = true;
  }

  public trackException(
    exception: Error,
    handledAt?: string,
    properties?: { [x: string]: string },
    measurements?: { [x: string]: number },
    severityLevel?: AI.SeverityLevel
  ) {
    // Application Insights
    if (this.configurations.applicationInsights) {
      AppInsights.trackException(
        exception,
        handledAt,
        properties,
        measurements,
        severityLevel
      );
    }

    // Sentry
    if (this.configurations.sentry) {
      if (properties) {
        Sentry.withScope((scope) => {
          Object.keys(properties).forEach(k => scope.setTag(k, properties[k]));
          Sentry.captureException(exception);
        });
      } else {
        Sentry.captureException(exception);
      }
    }
  }
}
