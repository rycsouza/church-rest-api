//@ts-nocheck
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'
import { BuscarEventoIdHelper } from '../evento/index.js'
import { CriarPagamento } from '../payment/index.js'
import { EnviarComprovanteDeInscricao } from './index.js'

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
      churchId: evento.churchId,
    })

    if (!evento.valor || evento.valor <= 0) {
      inscricao.situacaoId = Constants.Situacao.Concluido
      await inscricao.save()

      await EnviarComprovanteDeInscricao({ inscricao })

      return {
        whatsapp: evento.urlWhatsapp,
        localizacao: evento.urlLocalizacao,
        inscricao,
      }
    }

   // const { payment } = await CriarPagamento({
   //   inscricaoId: inscricao.id,
     // eventoId: evento.id,
     // formaPagamento: 'checkout',
     // usuario: {
      //  ...camposInscricao,
     // },
     // externalReference: inscricao.id.toString(),
    //})

    return { whatsapp: evento.urlWhatsapp, localizacao: evento.urlLocalizacao, inscricao }
  } catch (error) {
    throw error
  }
}
