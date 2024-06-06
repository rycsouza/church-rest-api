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
    } catch (error) {
      response.status(400).send({
        mensagem:
          'Não foi possível criar a igreja! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async update({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      const churchPayLoad = await request.validateUsing(ChurchUpdateValidator)

      return await AtualizarChurchHelper(id, churchPayLoad)
    } catch (error) {
      response.status(400).send({
        mensagem:
          'Não foi possível atualizar a igreja! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      return await BuscarChurchesHelper()
    } catch (error) {
      response.status(400).send({
        messagem:
          'Não foi possível encontrar as igrejas! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      return await BuscarChurchPorIdHelper(id)
    } catch (error) {
      response.status(400).send({ messagem: 'Igreja não encontrada!', error })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      return await DeletarChurchHelper(id)
    } catch (error) {
      response.status(400).send({
        mensagem:
          'Não foi possível deletar a igreja! Caso o erro continue, entre em contato com o suporte!',
        error,
      })
    }
  }
}
