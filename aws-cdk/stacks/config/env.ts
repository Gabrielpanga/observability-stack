import { cleanEnv, str } from 'envalid'

export type EnvConfig = {
  SENTRY_DSN?: string
  DATADOG_API_KEY?: string
}

export const envConfig: EnvConfig = cleanEnv(process.env, {
  SENTRY_DSN: str({
    desc: 'Sentry DSN to connect error management for pluggy-kafka',
    default: '',
  }),
  DATADOG_API_KEY: str({
    desc: 'Datadog API Key to connect monitoring for lambda functions',
    default: '',
  }),
})
