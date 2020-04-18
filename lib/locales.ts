import { IncomingMessage } from 'http'

export default function localeFromRequest(req: IncomingMessage) {
  if (req.headers['accept-language']?.startsWith('es')) {
    return 'es'
  }

  return 'en'
}
