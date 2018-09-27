[![Build Status](https://travis-ci.com/takenet/monitoring-error-handler.svg?branch=master)](https://travis-ci.com/takenet/monitoring-error-handler.svg?branch=master)
[![npm](https://img.shields.io/npm/v/monitoring-error-handler.svg)](https://www.npmjs.com/package/monitoring-error-handler)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Monitoring Error Handler

## Usage

First, install client

```
npm i -S monitoring-error-handler
```

Initialize client with Application Insights `instrumentation key`

```typescript
import { MonitoringErrorHandler } from 'monitoring-error-handler';

MonitoringErrorHandler.instance.initialize('YOUR-INSTRUMENTATION-KEY', 'applicationName');
```

Start tracking your exceptions

```typescript
try {
  doSomething();
} catch (exception) {
  MonitoringErrorHandler.instance.trackException(exception);
}
```
