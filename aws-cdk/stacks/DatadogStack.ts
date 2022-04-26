import * as sst from "@serverless-stack/resources";
import { Datadog } from 'datadog-cdk-constructs-v2'
import { envConfig } from './config/env'

const { DATADOG_API_KEY } = envConfig

export default class DatadogStack extends sst.Stack {
  protected datadog?: Datadog

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    if (!scope.local && DATADOG_API_KEY) {
      this.datadog = new Datadog(this, 'Datadog', {
        nodeLayerVersion: 65,
        extensionLayerVersion: 13,
        apiKey: DATADOG_API_KEY,
      })
    }

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    // Setup Datadog for observability
    // If datadog is configured, monitor all lambda functions
    this.datadog?.addLambdaFunctions(this.getAllFunctions())

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
