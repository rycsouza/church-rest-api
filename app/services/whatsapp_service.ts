import { client, MessageMedia } from '#config/whatsapp'
import { GenerateImage } from '../helpers/utils/index.js'
import fs from 'node:fs'

interface WhatsappTextMessageInterface {
  data: { [key: string]: string }
  mensagem: string
}

interface WhatsappMediaMessageInterface {
  data: { [key: string]: string }
  mensagem: string | undefined
  midiaFolder: string
  elementoHTML: string
}

export default class WhatsappService {
  static async sendTextMessage({ data, mensagem }: WhatsappTextMessageInterface) {
    try {
      const telefone = this.formatPhoneNumber({ telefone: data!.telefone })
      await client.sendMessage(telefone, mensagem)

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async sendMediaMessageGenerateBasedHTMLTemplate({
    data,
    mensagem = '',
    midiaFolder,
    elementoHTML,
  }: WhatsappMediaMessageInterface) {
    try {
      const telefone = this.formatPhoneNumber({ telefone: data?.telefone })

      const imageGenerated = await GenerateImage({ data, midiaFolder, elementoHTML })

      if (!imageGenerated) throw new Error('Não foi possível gerar a imagem para envio!')

      const midia = MessageMedia.fromFilePath(imageGenerated.pathMediaFile)
      await client.sendMessage(telefone, mensagem, { media: midia })

      if (fs.existsSync(imageGenerated.pathMediaFile)) fs.unlinkSync(imageGenerated.pathMediaFile) //apagando imagem do projeto, após envio!

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static formatPhoneNumber({ telefone }: { telefone: string }) {
    return telefone && telefone[0] === '5' && telefone[1] === '5'
      ? `${telefone}@c.us`
      : `55${telefone}@c.us`
  }
}
