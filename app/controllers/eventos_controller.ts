import type { HttpContext } from '@adonisjs/core/http'
import { BuscarEventoHelper } from '../helpers/evento/index.js'

export default class EventosController {
  async index({ response, auth }: HttpContext) {
    try {
      const usuario = auth.user

      return await BuscarEventoHelper(usuario!)
    } catch (error) {
      response.status(400).send({
        messagem:
          'Não foi possível encontrar os eventos! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }
}
