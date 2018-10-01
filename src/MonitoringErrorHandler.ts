import { SentryClient } from './clients/SentryClient';
import { ApplicationInsightsClient } from './clients/ApplicationInsightsClient';

export interface InitializeConfigurations {
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

  /**
   * Get class singleton instance
   */
  public static get instance(): MonitoringErrorHandler {
    MonitoringErrorHandler.Instance =
      MonitoringErrorHandler.Instance || new MonitoringErrorHandler();
    return MonitoringErrorHandler.Instance;
  }

  /**
   * Initialize clients integrated
   * @param configurations - initialize params
   */
  public initialize(configurations: InitializeConfigurations) {
    this.configurations = configurations;

    if (!this.hasInitialized) {
      // Application Insights
      ApplicationInsightsClient.initialize(configurations);

      // Sentry
      if (configurations.sentry) {
        SentryClient.initialize(configurations);
      }
    }

    this.hasInitialized = true;
  }

  /**
   * Track generic exception and send arguments to specifc clients
   * @param exception
   * @param handledAt
   * @param properties
   * @param measurements
   * @param severityLevel
   */
  public trackException(
    exception: Error,
    handledAt?: string,
    properties?: { [x: string]: string },
    measurements?: { [x: string]: number },
    severityLevel?: AI.SeverityLevel
  ) {
    // Application Insights
    if (this.configurations.applicationInsights) {
      ApplicationInsightsClient.trackException(
        exception,
        handledAt,
        properties,
        measurements,
        severityLevel
      );
    }

    // Sentry
    if (this.configurations.sentry) {
      SentryClient.trackException(exception, properties);
    }
  }
}
