import type { HttpContext } from '@adonisjs/core/http'
import {
  BuscarInscricaoHelper,
  BuscarInscricaoPorIdHelper,
  BuscarInscricaoPorResponsavelIdHelper,
  CriarInscricaoHelper,
} from '../helpers/inscricao/index.js'
import { BuscarUsuarioCPFHelper } from '../helpers/usuario/index.js'

interface InscricaoPayLoad {
  evento_id: number
  inscricao_json: JSON | string
}

export default class InscricaosController {
  async store({ request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const inscricaoPayLoad: InscricaoPayLoad = request.only(['inscricao_json', 'evento_id'])

    try {
      return await CriarInscricaoHelper(inscricaoPayLoad)
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível realizar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error: error.message,
      })
    }
  }

  async index({ response, auth }: HttpContext) {
    const usuario = auth.user

    try {
      return await BuscarInscricaoHelper(usuario)
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível buscar as inscrições desse evento! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    const { cpf } = request.params()
    try {
      const { usuario } = await BuscarUsuarioCPFHelper(cpf)

      return await BuscarInscricaoPorResponsavelIdHelper(usuario?.id)
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível encontrar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    const { id } = request.params()
    const inscricaoPayLoad = request.all()
    try {
      const { inscricao } = await BuscarInscricaoPorIdHelper(id)

      inscricao!.merge(inscricaoPayLoad)
      await inscricao!.save()

      return { inscricao }
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível encontrar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.params()
    try {
      const { inscricao } = await BuscarInscricaoPorIdHelper(id)

      await inscricao!.delete()

      return { messagem: `Inscrição ${inscricao?.id} excluída! Evento: ${inscricao?.evento_id}` }
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível encontrar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }
}
