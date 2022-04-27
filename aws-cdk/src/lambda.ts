import Sentry from "@sentry/serverless"
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from 'axios'

const baseHandler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('Processing request')
  const request = event.queryStringParameters || {}
  
  const { data: currencies } = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
  console.log(`Found ${Object.keys(currencies).length} currencies`)
  
  if (request.shouldFail) {
    console.log('When reviewing parameters, we found that the request should fail')
    throw new Error('Super random error that was not captured by our APP')
  }
  
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currencies),
  };
};

export const handler: APIGatewayProxyHandlerV2 = Sentry.AWSLambda.wrapHandler(baseHandler);