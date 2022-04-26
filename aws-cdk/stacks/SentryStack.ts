import * as sst from "@serverless-stack/resources";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { envConfig } from "./config/env";

const { SENTRY_DSN } = envConfig

export default class SentryStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    if (!scope.local && SENTRY_DSN) {
      const sentry = LayerVersion.fromLayerVersionArn(
        this,
        'SentryLayer',
        `arn:aws:lambda:${scope.region}:943013980633:layer:SentryNodeServerlessSDK:35`
      )

      this.addDefaultFunctionLayers([sentry])
      this.addDefaultFunctionEnv({
        SENTRY_DSN,
        SENTRY_TRACES_SAMPLE_RATE: '1.0',
        NODE_OPTIONS: '-r @sentry/serverless/dist/awslambda-auto',
      })
    }
  
    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
