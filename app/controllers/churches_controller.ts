import { ChurchCreateValidator, ChurchUpdateValidator } from '#validators/church'
import type { HttpContext } from '@adonisjs/core/http'
import {
  CriarChurchHelper,
  AtualizarChurchHelper,
  BuscarChurchesHelper,
  BuscarChurchPorIdHelper,
  DeletarChurchHelper,
} from '../helpers/church/index.js'

export default class ChurchesController {
  async store({ response, request }: HttpContext) {
    try {
      const churchPayLoad = await request.validateUsing(ChurchCreateValidator)

      return await CriarChurchHelper(churchPayLoad)
    } catch {
      response.status(404).send({
        mensagem:
          'Não foi possível criar a igreja! Caso o erro continue, entre em contato com o suporte.',
      })
    }
  }

  async update({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      const churchPayLoad = await request.validateUsing(ChurchUpdateValidator)

      return await AtualizarChurchHelper(id, churchPayLoad)
    } catch {
      response.status(404).send({
        mensagem:
          'Não foi possível atualizar a igreja! Caso o erro continue, entre em contato com o suporte.',
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      return await BuscarChurchesHelper()
    } catch {
      response.status(404).send({
        messagem:
          'Não foi possível encontrar as igrejas! Caso o erro continue, entre em contato com o suporte.',
      })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      return await BuscarChurchPorIdHelper(id)
    } catch {
      response.status(404).send({ messagem: 'Igreja não encontrada!' })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      return await DeletarChurchHelper(id)
    } catch {
      response.status(404).send({
        mensagem:
          'Não foi possível deletar a igreja! Caso o erro continue, entre em contato com o suporte!',
      })
    }
  }
}
