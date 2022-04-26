import * as sst from "@serverless-stack/resources";

import DataDogStack from "./DatadogStack";
import SentryStack from "./SentryStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new DataDogStack(app, "datadog-stack");
  new SentryStack(app, "sentry-stack");
}
