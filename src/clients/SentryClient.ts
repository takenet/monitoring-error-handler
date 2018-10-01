import * as Sentry from '@sentry/browser';
import { InitializeConfigurations } from '../MonitoringErrorHandler';

export class SentryClient {
  public static initialize(configurations: InitializeConfigurations) {
    Sentry.init({
      dsn: configurations.sentry.dsn,
      environment: configurations.sentry.environment,
    });
  }

  public static trackException(exception: Error, properties?: { [x: string]: string }) {
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
