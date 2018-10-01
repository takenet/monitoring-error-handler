import { InitializeConfigurations } from "../MonitoringErrorHandler";
import { AppInsights } from 'applicationinsights-js';

interface IAppInsightsTrackException {
  exception: Error;
  handledAt?: string;
  properties?: { [x: string]: string };
  measurements?: { [x: string]: number };
  severityLevel?: AI.SeverityLevel;
}

export class ApplicationInsightsClient {
  public static initialize(configurations: InitializeConfigurations) {
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
  }

  public static trackException({
    exception,
    handledAt,
    properties,
    measurements,
    severityLevel
  }: IAppInsightsTrackException) {
    AppInsights.trackException(
      exception,
      handledAt,
      properties,
      measurements,
      severityLevel
    );
  }
}
