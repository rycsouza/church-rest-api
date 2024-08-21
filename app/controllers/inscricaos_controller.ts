import type { HttpContext } from '@adonisjs/core/http'
import {
  BuscarInscricaoHelper,
  BuscarInscricaoPorIdHelper,
  BuscarInscricaoCPF,
  CriarInscricaoHelper,
  CheckInInscricaoHelper,
} from '../helpers/inscricao/index.js'

interface InscricaoPayLoad {
  eventoId: number
  inscricaoJson: JSON
}

export default class InscricaosController {
  async store({ request, response }: HttpContext) {
    const inscricaoPayLoad: InscricaoPayLoad = request.only(['inscricaoJson', 'eventoId'])

    try {
      return await CriarInscricaoHelper(inscricaoPayLoad)
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível realizar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async checkIn({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      return await CheckInInscricaoHelper(id)
    } catch (error) {
      const { message, cause } = error

      return response.status(400).send({
        success: false,
        message,
        cause,
      })
    }
  }

  async index({ response, auth }: HttpContext) {
    const usuario = auth.user

    try {
      return await BuscarInscricaoHelper(usuario)
    } catch (error) {
      const { message, cause } = error

      return response.status(400).send({
        success: false,
        message,
        cause,
      })
    }
  }

  async buscarPorCPF({ request, response }: HttpContext) {
    const { eventoId } = request.all()
    const { cpf } = request.params()

    try {
      return await BuscarInscricaoCPF({ cpf, eventoId })
    } catch (error) {
      const { message, cause } = error

      return response.status(400).send({
        success: false,
        message,
        cause,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      return await BuscarInscricaoPorIdHelper(id)
    } catch (error) {
      const { message, cause } = error

      return response.status(400).send({
        success: false,
        message,
        cause,
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
      const { message, cause } = error

      return response.status(400).send({
        success: false,
        message,
        cause,
      })
    }
  }

  async delete({ request, response }: HttpContext) {
    const { id } = request.params()
    try {
      const { inscricao } = await BuscarInscricaoPorIdHelper(id)

      await inscricao!.delete()

      return { messagem: `Inscrição ${inscricao?.id} excluída! Evento: ${inscricao?.eventoId}` }
    } catch (error) {
      const { message, cause } = error

      return response.status(400).send({
        success: false,
        message,
        cause,
      })
    }
  }
}
