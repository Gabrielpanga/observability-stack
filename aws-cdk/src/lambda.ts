import Sentry from "@sentry/serverless"
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from 'axios'

const CURRENCY_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'

function createHttpResponse(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };
}

const baseHandler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log(`Processing request: ${event.rawQueryString}`)
  
  let currencies
  try {
    const response = await axios.get(CURRENCY_API_URL)
    currencies = response.data
    console.log(`Found ${Object.keys(currencies).length} currencies`)
  } catch (error) {
    console.info(`Failed to fetch currencies, ${(error as Error).message}`)
    console.error(error)
    return createHttpResponse(500, { error: 'Failed to fetch currencies' })
  }
  
  return createHttpResponse(200, currencies);
};

export const handler: APIGatewayProxyHandlerV2 = Sentry.AWSLambda.wrapHandler(baseHandler);