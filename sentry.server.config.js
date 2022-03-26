import * as Sentry from '@sentry/nextjs'
import getConfig from 'next/config'

const SENTRY_DSN = getConfig().publicRuntimeConfig.dsn

Sentry.init({
  dsn: SENTRY_DSN,
})
