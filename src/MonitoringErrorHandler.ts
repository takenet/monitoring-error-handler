import { AppInsights } from 'applicationinsights-js';

export class MonitoringErrorHandler {
  private static Instance: MonitoringErrorHandler;
  public hasInitialized: any;

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

  public initialize(appInsightsInstrumentationKey: string, applicationName?: string) {
    if (!this.hasInitialized && AppInsights.downloadAndSetup) {
      AppInsights.downloadAndSetup({
        instrumentationKey: appInsightsInstrumentationKey,
      });

      if (applicationName) {
        AppInsights.queue.push(() => {
          AppInsights.context.addTelemetryInitializer((evelope) => {
            evelope.tags['ai.cloud.role'] = applicationName;
          });
        });
      }

      this.hasInitialized = true;
    }
  }

  public trackException(
    exception: Error,
    handledAt?: string,
    properties?: { [x: string]: string },
    measurements?: { [x: string]: number },
    severityLevel?: AI.SeverityLevel
  ) {
    AppInsights.trackException(
      exception,
      handledAt,
      properties,
      measurements,
      severityLevel
    );
  }
}
