import { DEFAULT_EMAIL_FROM } from 'sendgrid/constants'
import sendgrid from 'sendgrid/client'

export function sendErrorEmail(error: string, email: string) {
  const mailOptions = {
    to: email,
    from: DEFAULT_EMAIL_FROM,
    templateId: 'd-2f5a311bcc1e4508b0201c08c37baed5',
    dynamic_template_data: {
      error,
    },
  }

  return sendgrid.send(mailOptions).catch((err) => {
    console.error(err)
  })
}
