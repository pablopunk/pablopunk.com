import {
  DEFAULT_EMAIL_FROM,
  ERROR_EMAIL_TEMPLATE,
} from 'email/sendgrid/constants'
import sendgrid from 'email/sendgrid/client'

export function sendErrorEmail(error: string, email: string) {
  const mailOptions = {
    to: email,
    from: DEFAULT_EMAIL_FROM,
    templateId: ERROR_EMAIL_TEMPLATE,
    dynamic_template_data: {
      error,
    },
  }

  return sendgrid.send(mailOptions).catch((err) => {
    console.error(err)
  })
}
