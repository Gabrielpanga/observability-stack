import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import DatadogStack from "../stacks/DatadogStack";
import SentryStack from "../stacks/SentryStack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const datadogStack = new DatadogStack(app, "datadog-stack");
  const sentryStack = new SentryStack(app, "sentry-stack");

  // THEN
  const datadogTemplate = Template.fromStack(datadogStack);
  datadogTemplate.resourceCountIs("AWS::Lambda::Function", 1);

  const sentryTemplate = Template.fromStack(sentryStack);
  sentryTemplate.resourceCountIs("AWS::Lambda::Function", 1);
});
