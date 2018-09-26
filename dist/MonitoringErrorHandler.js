"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const applicationinsights_js_1 = require("applicationinsights-js");
class MonitoringErrorHandler {
    constructor() {
        if (MonitoringErrorHandler.Instance) {
            throw new Error('MonitoringErrorHandler is a singleton class. Use getInstance() method instead');
        }
    }
    static get instance() {
        MonitoringErrorHandler.Instance =
            MonitoringErrorHandler.Instance || new MonitoringErrorHandler();
        return MonitoringErrorHandler.Instance;
    }
    initialize(appInsightsInstrumentationKey) {
        if (!this.hasInitialized && applicationinsights_js_1.AppInsights.downloadAndSetup) {
            applicationinsights_js_1.AppInsights.downloadAndSetup({
                instrumentationKey: appInsightsInstrumentationKey
            });
            this.hasInitialized = true;
        }
    }
    trackException(exception, handledAt, properties, measurements, severityLevel) {
        applicationinsights_js_1.AppInsights.trackException(exception, handledAt, properties, measurements, severityLevel);
    }
}
exports.MonitoringErrorHandler = MonitoringErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvcmluZ0Vycm9ySGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb25pdG9yaW5nRXJyb3JIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUVBQXFEO0FBRXJELE1BQWEsc0JBQXNCO0lBSWpDO1FBQ0UsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDYiwrRUFBK0UsQ0FDaEYsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVNLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLHNCQUFzQixDQUFDLFFBQVE7WUFDN0Isc0JBQXNCLENBQUMsUUFBUSxJQUFJLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUNsRSxPQUFPLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztJQUN6QyxDQUFDO0lBRU0sVUFBVSxDQUFDLDZCQUFxQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxvQ0FBVyxDQUFDLGdCQUFnQixFQUFFO1lBQ3hELG9DQUFXLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLGtCQUFrQixFQUFFLDZCQUE2QjthQUNsRCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFTSxjQUFjLENBQ25CLFNBQWdCLEVBQ2hCLFNBQWtCLEVBQ2xCLFVBQW9DLEVBQ3BDLFlBQXNDLEVBQ3RDLGFBQWdDO1FBRWhDLG9DQUFXLENBQUMsY0FBYyxDQUN4QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUExQ0Qsd0RBMENDIn0=