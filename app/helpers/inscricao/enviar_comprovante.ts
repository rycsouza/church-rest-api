//@ts-nocheck
import Inscricao from '#models/inscricao'
import MailService from '#services/mail_service'
import WhatsappService from '#services/whatsapp_service'
import axios from 'axios'
import { BuscarEventoIdHelper } from '../evento/index.js'
import env from '#start/env'

const URL_COMUNICACAO_API = env.get('URL_COMUNICACAO_API')

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
      await axios.post(`${URL_COMUNICACAO_API}/mail`, {
        email: camposInscricao.email,
        sender: { email: JSON.parse(evento.church.configJson)?.email, name: evento.church.nome },
        htmlParams: {
          evento,
          inscricao,
        },
        templateTag: 'comprovante-inscricao',
      })
    }

    if (camposInscricao?.telefone) {
      await axios.post(`${URL_COMUNICACAO_API}/whatsapp/media`, {
        params: { id: inscricao.id, telefone: camposInscricao.telefone, evento, inscricao },
        templateTag: 'comprovante-inscricao',
      })
    }

    if (camposResponsaveis && camposResponsaveis?.telefone !== camposInscricao?.telefone) {
      await axios.post(`${URL_COMUNICACAO_API}/whatsapp/media`, {
        params: { id: inscricao.id, telefone: camposResponsaveis.telefone, evento, inscricao },
        templateTag: 'comprovante-inscricao',
      })
    }

    return true
  } catch (error) {
    console.log(error.response.data)
    return false
  }
}
