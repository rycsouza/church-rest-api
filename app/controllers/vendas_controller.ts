//@ts-nocheck
import Constants from '#models/constants'
import Formulario from '#models/formulario'
import Venda from '#models/venda'
import type { HttpContext } from '@adonisjs/core/http'

export default class VendasController {
  async store({ request }: HttpContext) {
    try {
      const { forma_pagamento, campos } = request.all()
      const { tipo, tag } = request.params()

      const formulario = await Formulario.find({ tipo, tag })

      if (!formulario)
        throw new Error('Falha ao realizar a Venda!', { cause: 'Formulário não encontrado!' })

      await formulario.load('empresa')

      const venda = await Venda.create({
        empresa_id: formulario.empresa_id,
        formulario_id: formulario.id,
        valor: formulario.config_json.valor,
        forma_pagamento,
        gateway: formulario.empresa.config_json.gateway,
        detalhe_json: campos,
        situacao_id: Constants.Situacao.Pendente,
      })

      if (!venda)
        throw new Error('Falha ao realizar a Venda!', { cause: 'Ocorreu um erro interno!' })

      return {
        success: true,
        message: 'Venda realizada com sucesso!',
      }
    } catch (error) {
      const { message, cause } = error
      throw { message, cause }
    }
  }
}
