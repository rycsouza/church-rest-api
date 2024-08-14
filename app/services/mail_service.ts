import mail from '@adonisjs/mail/services/main'

interface MailType {
  sender: { email: string; name: string }
  receiver: string
  subject: string
  htmlFile: string
  params: object
}

const htmlPath = '../../resources/views/mails'

export default class MailService {
  static async send({ sender, receiver, subject, htmlFile, params = {} }: MailType) {
    return await mail.send((message: any) => {
      message
        .to(receiver)
        .from(sender.email, sender.name)
        .subject(subject)
        .htmlView(`${htmlPath}/${htmlFile}.edge`, params)
    })
  }
}
