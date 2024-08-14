//@ts-nocheck
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'
import MailService from '#services/mail_service'
import { BuscarEventoIdHelper } from '../evento/index.js'
import { CriarPagamento } from '../payment/index.js'

interface InscricaoPayLoad {
  eventoId: number
  inscricaoJson: JSON
}

export default async (inscricaoPayLoad: InscricaoPayLoad) => {
  try {
    const inscricaoJSON = inscricaoPayLoad.inscricaoJson
    const camposInscricao = inscricaoJSON?.camposInscricao

    if (!camposInscricao?.cpf) throw new Error(`CPF é um campo obrigatório!`)

    const { evento } = await BuscarEventoIdHelper(inscricaoPayLoad.eventoId)

    const inscricao = await Inscricao.create({
      eventoId: evento.id,
      situacaoId: Constants.Situacao.Pendente,
      inscricaoJson: inscricaoJSON,
    })

    if (!evento.valor || evento.valor <= 0) {
      inscricao.situacaoId = Constants.Situacao.Concluido
      await inscricao.save()

      if (camposInscricao?.email) {
        await inscricao.load('situacao')
        await evento.load('church')

        await MailService.send({
          sender: { email: JSON.parse(evento.church.configJson)?.email, name: evento.church.nome },
          receiver: camposInscricao.email,
          subject: `${evento.nome} - Comprovante de Inscrição`,
          htmlFile: 'comprovante_inscricao',
          params: {
            nome: camposInscricao.nome,
            cpf: camposInscricao.cpf,
            evento: evento.nome,
            valor: evento.valor,
            situacao: inscricao.situacao.descricao,
            id: inscricao.id,
            igreja: evento.church.nome,
          },
        })
      }

      return {
        whatsapp: evento.urlWhatsapp,
        localizacao: evento.urlLocalizacao,
        inscricao,
      }
    }

    const { payment } = await CriarPagamento({
      inscricaoId: inscricao.id,
      eventoId: evento.id,
      formaPagamento: 'checkout',
      usuario: {
        //@ts-ignore
        cpf: camposInscricao.cpf,
        //@ts-ignore
        nome: camposInscricao.nome,
        //@ts-ignore
        telefone: camposInscricao.telefone,
        //@ts-ignore
        email: camposInscricao.email,
      },
      externalReference: inscricao.id.toString(),
    })

    return { payment, whatsapp: evento.urlWhatsapp, localizacao: evento.urlLocalizacao, inscricao }
  } catch (error) {
    throw error
  }
}
