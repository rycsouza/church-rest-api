import { BuscarEventoIdHelper } from '../evento/index.js'
import { CriarPagamento } from '../payment/index.js'
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'

interface InscricaoPayLoad {
  eventoId: number
  inscricaoJson: JSON | string
}

export default async (inscricaoPayLoad: InscricaoPayLoad) => {
  try {
    const inscricaoJSON: any =
      typeof inscricaoPayLoad.inscricaoJson === 'string'
        ? JSON.parse(inscricaoPayLoad.inscricaoJson)
        : inscricaoPayLoad.inscricaoJson

    if (!inscricaoJSON?.camposInscricao?.cpf) throw new Error(`CPF é um campo obrigatório!`)

    const { evento } = await BuscarEventoIdHelper(inscricaoPayLoad.eventoId)

    const inscricao = await Inscricao.create({
      eventoId: evento.id,
      situacaoId: Constants.Situacao.Pendente,
      inscricaoJson: inscricaoJSON,
    })

    const { payment } = await CriarPagamento({
      inscricaoId: inscricao.id,
      eventoId: evento.id,
      formaPagamento: 'checkout',
      usuario: {
        cpf: inscricaoJSON?.camposInscricao.cpf,
        nome: inscricaoJSON?.camposInscricao.nome,
        email: inscricaoJSON?.camposInscricao.telefone,
        telefone: inscricaoJSON?.camposInscricao.email,
      },
    })

    return { payment, whatsapp: evento.urlWhatsapp, inscricao }
  } catch (error) {
    throw error
  }
}
