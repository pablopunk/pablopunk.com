import { IncomingMessage } from 'http'

export function localeFromString(str: string) {
  if (str.startsWith('es')) {
    return 'es'
  }

  return 'en'
}

export function localeFromRequest(req: IncomingMessage) {
  return localeFromString(req.headers['accept-language'])
}

export function localeFromBrowser() {
  return localeFromString(window?.navigator?.language || 'en')
}
