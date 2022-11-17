import {
  DEFAULT_EMAIL_FROM,
  TRANSLATION_REQUEST_EMAIL_TEMPLATE,
} from 'email/sendgrid/constants'
import sendgrid from 'email/sendgrid/client'
import { TranslationRequest } from '@db/supabase/types'

export function sendTranslationRequestEmail(
  request: TranslationRequest,
  email: string,
) {
  const mailOptions = {
    to: email,
    from: DEFAULT_EMAIL_FROM,
    templateId: TRANSLATION_REQUEST_EMAIL_TEMPLATE,
    dynamic_template_data: {
      slug: request.slug,
      ip: request.ip || '',
      guessed_country: request.guessed_country || '',
    },
  }

  return sendgrid.send(mailOptions).catch((err) => {
    console.error(err)
  })
}
