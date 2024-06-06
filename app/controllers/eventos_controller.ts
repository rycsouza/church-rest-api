import { EventoCreateValidator, EventoUpdateValidator } from '#validators/evento'

import type { HttpContext } from '@adonisjs/core/http'
import {
  CriarEventoHelper,
  BuscarEventoHelper,
  AtualizarEventoHelper,
  BuscarEventoIdHelper,
  DeletarEventoHelper,
} from '../helpers/evento/index.js'
import { BuscarChurchPorIdHelper } from '../helpers/church/index.js'

export default class EventosController {
  async store({ request, response }: HttpContext) {
    try {
      const eventoPayLoad: any = await request.validateUsing(EventoCreateValidator)

      return await CriarEventoHelper(eventoPayLoad)
    } catch (error) {
      response.status(400).send({
        messagem:
          'Não foi possível criar evento! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const eventoPayLoad = await request.validateUsing(EventoUpdateValidator)

      return await AtualizarEventoHelper(id, eventoPayLoad)
    } catch (error) {
      response.status(400).send({
        messagem:
          'Não foi possível atualizar o evento! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

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

  async show({ request, response, auth }: HttpContext) {
    try {
      const { id } = request.params()
      const usuario = auth.user

      return await BuscarEventoIdHelper(id, usuario)
    } catch (error) {
      response.status(400).send({ messagem: 'Evento não Encontrado!', error })
    }
  }

  async showForms({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      const { evento } = await BuscarEventoIdHelper(id)
      const { church } = await BuscarChurchPorIdHelper(evento?.church_id)

      return { imagem: evento.imagem, forms: evento.formulario_json, church }
    } catch (error) {
      response.status(400).send({ messagem: 'Evento não Encontrado!', error })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      return await DeletarEventoHelper(id)
    } catch (error) {
      response.status(400).send({
        messagem:
          'Não foi possível deletar o evento! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }
}
