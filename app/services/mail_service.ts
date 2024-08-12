import mail from '@adonisjs/mail/services/main'

interface MailType {
  sender: string
  receiver: string
  subject: string
  htmlPath: string
}

export default class MailService {
  static async send({ sender, receiver, subject, htmlPath }: MailType) {
    return await mail.send((message) => {
      message.to(receiver).from(sender).subject(subject).htmlView(htmlPath)
    })
  }
}
