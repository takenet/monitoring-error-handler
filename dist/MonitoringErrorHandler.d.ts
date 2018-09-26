/// <reference types="applicationinsights-js" />
export declare class MonitoringErrorHandler {
    private static Instance;
    hasInitialized: any;
    private constructor();
    static readonly instance: MonitoringErrorHandler;
    initialize(appInsightsInstrumentationKey: string): void;
    trackException(exception: Error, handledAt?: string, properties?: {
        [x: string]: string;
    }, measurements?: {
        [x: string]: number;
    }, severityLevel?: AI.SeverityLevel): void;
}
