import * as Sentry from '@sentry/browser';
import { InitializeConfigurations } from '../MonitoringErrorHandler';

interface ISentryTrackException {
  exception: Error;
  properties?: { [x: string]: string };
  user?: Sentry.User;
}

export class SentryClient {
  public static initialize(configurations: InitializeConfigurations) {
    Sentry.init({
      dsn: configurations.sentry.dsn,
      environment: configurations.sentry.environment,
    });
  }

  public static trackException({
    exception,
    properties,
    user
  }: ISentryTrackException) {
    if (user) {
      SentryClient.identifyUser(user);
    }

    if (properties) {
      Sentry.withScope((scope) => {
        Object.keys(properties).forEach(k => scope.setTag(k, properties[k]));
        Sentry.captureException(exception);
      });
    } else {
      Sentry.captureException(exception);
    }
  }

  private static identifyUser(user: Sentry.User) {
    Sentry.configureScope((scope) => {
      scope.setUser({...user });
    });
  }
}
