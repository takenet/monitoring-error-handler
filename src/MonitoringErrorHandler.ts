import { SentryClient } from './clients/SentryClient';
import { User as SentryUser } from '@sentry/browser';
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

export interface ITrackExceptionConfigs {
  exception: Error;
  handledAt?: string;
  properties?: { [x: string]: string };
  measurements?: { [x: string]: number };
  severityLevel?: AI.SeverityLevel;
  user?: SentryUser;
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

  public trackException({
    exception,
    handledAt,
    properties,
    measurements,
    severityLevel,
    user,
  }: ITrackExceptionConfigs) {
    // Application Insights
    if (this.configurations.applicationInsights) {
      ApplicationInsightsClient.trackException({
        exception,
        handledAt,
        measurements,
        properties,
        severityLevel
      });
    }

    // Sentry
    if (this.configurations.sentry) {
      SentryClient.trackException({
        exception,
        properties,
        user,
      });
    }
  }
}
