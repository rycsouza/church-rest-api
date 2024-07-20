import type { HttpContext } from '@adonisjs/core/http'
import { VerificarPagamento } from '../helpers/payment/index.js'

export default class PaymentsController {
  async handle({ request, response }: HttpContext) {
    const payment = request.all()
    console.log('MEU P: ', payment)
    try {
      return await VerificarPagamento({ payment, response })
    } catch (error) {
      throw error
    }
  }
}
