import { BuscarEventoIdHelper } from '../evento/index.js'
import { BuscarInscricaoPorIdHelper } from '../inscricao/index.js'
import { BuscarUsuarioIdHelper } from '../usuario/index.js'
import Constants from '#models/constants'

interface PayementRequest {
  eventoId: number
  inscricaoId: number
  formaPagamento: 'checkout'
}

export default async ({ inscricaoId, eventoId, formaPagamento }: PayementRequest) => {
  try {
    const { inscricao } = await BuscarInscricaoPorIdHelper(inscricaoId)
    const { evento } = await BuscarEventoIdHelper(eventoId)
    const { usuario } = await BuscarUsuarioIdHelper(inscricao?.responsavelId)

    const { url, id } = await Constants.FormaPagamento[formaPagamento]({ evento, usuario })

    inscricao!.mercadoPagoId = id
    await inscricao?.save()

    return { payment: { url } }
  } catch (error) {
    throw error
  }
}
