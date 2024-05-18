import type { HttpContext } from '@adonisjs/core/http'
import { CriarInscricaoHelper } from '../helpers/inscricao/index.js'

interface InscricaoPayLoad {
  evento_id: number
  inscricao_json: JSON | string
  payment_body: JSON | null
}

export default class InscricaosController {
  async store({ request, response }: HttpContext) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const inscricaoPayLoad: InscricaoPayLoad = request.only([
        'inscricao_json',
        'evento_id',
        'payment_body',
      ])

      return await CriarInscricaoHelper(inscricaoPayLoad)
    } catch {
      response.status(404).send({
        mensagem:
          'Não foi possível realizar a inscrição! Caso o erro continue, entre em contato com o suporte.',
      })
    }
  }
}
