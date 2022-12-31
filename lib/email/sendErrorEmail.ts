import {
  DEFAULT_EMAIL_FROM,
  ERROR_EMAIL_TEMPLATE,
} from 'lib/email/sendgrid/constants'
import sendgrid from 'lib/email/sendgrid/client'

export function sendErrorEmail(error: string) {
  const mailOptions = {
    to: process.env.ADMIN_EMAIL,
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
