import Constants from '#models/constants'
import { BuscarEventoIdHelper } from '../evento/index.js'
import { BuscarInscricaoPorIdHelper } from '../inscricao/index.js'
import { BuscarUsuarioIdHelper } from '../usuario/index.js'

interface PayementRequest {
  eventoId: number
  inscricaoId: number
  formaPagamento: 'pix' | 'cartao'
  cartao: string | null
}

export default async ({ inscricaoId, eventoId, formaPagamento, cartao }: PayementRequest) => {
  try {
    const { inscricao } = await BuscarInscricaoPorIdHelper(inscricaoId)
    const { evento } = await BuscarEventoIdHelper(eventoId)
    const { usuario } = await BuscarUsuarioIdHelper(inscricao!.responsavel_id)

    const payment = await Constants.FormaPagamento[formaPagamento]({ evento, usuario, cartao })

    return payment
  } catch (error) {
    throw error
  }
}
