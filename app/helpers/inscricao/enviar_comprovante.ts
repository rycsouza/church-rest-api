//@ts-nocheck
import Inscricao from '#models/inscricao'
import MailService from '#services/mail_service'
import WhatsappService from '#services/whatsapp_service'
import { BuscarEventoIdHelper } from '../evento/index.js'

export default async ({ inscricao }: { inscricao: Inscricao }) => {
  try {
    if (!inscricao)
      throw new Error(
        'É necessário informar a inscrição para que seja realizado o envio do comprovante!'
      )

    const { camposInscricao, camposResponsaveis } =
      typeof inscricao?.inscricaoJson === 'string'
        ? JSON.parse(inscricao?.inscricaoJson)
        : inscricao?.inscricaoJson

    const { evento } = await BuscarEventoIdHelper(inscricao?.eventoId)
    await inscricao.load('situacao')
    await evento.load('church')

    if (camposInscricao?.email) {
      await MailService.send({
        sender: { email: JSON.parse(evento.church.configJson)?.email, name: evento.church.nome },
        receiver: camposInscricao.email,
        subject: `${evento.nome} - Comprovante de Inscrição`,
        htmlFile: 'comprovante_inscricao',
        params: {
          evento,
          inscricao,
        },
      })
    }

    if (camposInscricao?.telefone) {
      await WhatsappService.sendMediaMessageGenerateBasedHTMLTemplate({
        data: {
          id: inscricao.id,
          telefone: camposInscricao?.telefone,
          evento,
          inscricao,
        },
        mensagem: 'Inscrição confirmada!✅ - Mostre esse comprovante no dia do evento!',
        midiaFolder: 'comprovante_inscricao',
        elementoHTML: '.container',
      })
    }

    if (camposResponsaveis && camposResponsaveis?.telefone !== camposInscricao?.telefone) {
      await WhatsappService.sendMediaMessageGenerateBasedHTMLTemplate({
        data: {
          id: inscricao.id,
          telefone: camposResponsaveis?.telefone,
          evento,
          inscricao,
        },
        mensagem: 'Inscrição confirmada!✅ - Mostre esse comprovante no dia do evento!',
        midiaFolder: 'comprovante_inscricao',
        elementoHTML: '.container',
      })
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
