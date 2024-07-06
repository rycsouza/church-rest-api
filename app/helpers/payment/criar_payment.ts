import { BuscarEventoIdHelper } from '../evento/index.js'
import { BuscarInscricaoPorIdHelper } from '../inscricao/index.js'
import Constants from '#models/constants'

interface PayementRequest {
  eventoId: number
  inscricaoId: number
  formaPagamento: 'checkout'
  usuario: {
    cpf: string
    nome?: string
    telefone?: string
    email?: string
  }
}

export default async ({ inscricaoId, eventoId, formaPagamento, usuario }: PayementRequest) => {
  try {
    const { inscricao } = await BuscarInscricaoPorIdHelper(inscricaoId)
    const { evento } = await BuscarEventoIdHelper(eventoId)

    const { url, id } = await Constants.FormaPagamento[formaPagamento]({
      evento,
      usuario,
      pId: inscricao?.mercadoPagoId,
    })

    inscricao.merge({ mercadoPagoId: id, inscricaoJson: JSON.stringify(inscricao.inscricaoJson) })
    await inscricao?.save()

    return { payment: { url } }
  } catch (error) {
    throw error
  }
}
