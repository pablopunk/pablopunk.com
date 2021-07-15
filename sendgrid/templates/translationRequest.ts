import { DEFAULT_EMAIL_FROM } from 'sendgrid/constants'
import sendgrid from 'sendgrid/client'
import { TranslationRequest } from 'supabase/types'

export function sendTranslationRequestEmail(
  request: TranslationRequest,
  email: string,
) {
  const mailOptions = {
    to: email,
    from: DEFAULT_EMAIL_FROM,
    templateId: 'd-c93c9e99beaf43359bb03c7ac5a5d999',
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
