import mail from '@adonisjs/mail/services/main'

interface MailType {
  sender: string
  receiver: string
  subject: string
  htmlFile: string
}

const htmlPath = '../../resources/mails'

export default class MailService {
  static async send({ sender, receiver, subject, htmlFile }: MailType) {
    return await mail.send((message: any) => {
      message.to(receiver).from(sender).subject(subject).htmlView(`${htmlPath}/${htmlFile}.edge`)
    })
  }
}
