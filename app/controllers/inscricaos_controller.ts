import type { HttpContext } from '@adonisjs/core/http'
import {
  BuscarInscricaoHelper,
  BuscarInscricaoPorIdHelper,
  BuscarInscricaoCPF,
  CriarInscricaoHelper,
} from '../helpers/inscricao/index.js'

interface InscricaoPayLoad {
  eventoId: number
  inscricaoJson: JSON
}

export default class InscricaosController {
  async store({ request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
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

  async buscarPorCPF({ request, response }: HttpContext) {
    const { eventoId } = request.all()
    const { cpf } = request.params()

    try {
      return await BuscarInscricaoCPF({ cpf, eventoId })
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível encontrar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }

  async show({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      return await BuscarInscricaoPorIdHelper(id)
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

      return { messagem: `Inscrição ${inscricao?.id} excluída! Evento: ${inscricao?.eventoId}` }
    } catch (error) {
      return response.status(400).send({
        mensagem:
          'Não foi possível encontrar a inscrição! Caso o erro continue, entre em contato com o suporte.',
        error,
      })
    }
  }
}
