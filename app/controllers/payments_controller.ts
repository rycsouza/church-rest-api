import type { HttpContext } from '@adonisjs/core/http'
import { CriarPagamento, VerificarPagamento } from '../helpers/payment/index.js'

export default class PaymentsController {
  async handle({ request, response }: HttpContext) {
    const { payment } = request.all()
    try {
      return await VerificarPagamento({ payment, response })
    } catch (error) {
      throw error
    }
  }

  async store({ request }: HttpContext) {
    const { eventoId, inscricaoId, formaPagamento }: any = request.only([
      'eventoId',
      'inscricaoId',
      'formaPagamento',
    ])

    try {
      return await CriarPagamento({ eventoId, inscricaoId, formaPagamento })
    } catch (error) {
      throw error
    }
  }
}
