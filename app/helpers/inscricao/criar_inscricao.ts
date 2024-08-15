import { BuscarEventoIdHelper } from '../evento/index.js'
import { CriarPagamento } from '../payment/index.js'
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'

interface InscricaoPayLoad {
  eventoId: number
  inscricaoJson: JSON
}

export default async (inscricaoPayLoad: InscricaoPayLoad) => {
  try {
    //@ts-ignore
    const inscricaoJSON = inscricaoPayLoad.inscricaoJson

    //@ts-ignore
    if (!inscricaoJSON?.camposInscricao?.cpf) throw new Error(`CPF é um campo obrigatório!`)

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
        cpf: inscricaoJSON?.camposInscricao.cpf,
        //@ts-ignore
        nome: inscricaoJSON?.camposInscricao.nome,
        //@ts-ignore
        telefone: inscricaoJSON?.camposInscricao.telefone,
        //@ts-ignore
        email: inscricaoJSON?.camposInscricao.email,
      },
      externalReference: inscricao.id.toString(),
    })

    return { payment, whatsapp: evento.urlWhatsapp, localizacao: evento.urlLocalizacao, inscricao }
  } catch (error) {
    throw error
  }
}
