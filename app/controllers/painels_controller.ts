import { HttpContext } from '@adonisjs/core/http'
import Constants from '#models/constants'
import Venda from '#models/venda'
import { Parser } from 'json2csv'

export default class PainelsController {
  async getResources() {
    const resources = (await import('../utils/resouces_instance.js')).default

    resources.forEach((resource) => {
      //@ts-ignore
      resource.code = Constants.Permissoes[resource.options.id].list
    })

    return { resources }
  }

  async downloadCSV({ request, response }: HttpContext) {
    try {
      const empresaId = request.param('id')

      if (!empresaId) throw new Error('O ID da Empresa é obrigatório.')

      const vendas = await Venda.query().where('empresa_id', empresaId)

      const vendasFormatadas: any[] = []
      await Promise.all(
        vendas.map(async (venda) => {
          await venda.load('situacao')

          //@ts-ignore
          const vendaDetalhe = JSON.parse(venda.detalheJson)
          vendasFormatadas.push({
            ...vendaDetalhe,
            valor: venda.valor,
            formaPagamento: venda.formaPagamento,
            status: venda.situacao.descricao,
          })
        })
      )

      const keys: any[] = []
      //@ts-ignore
      Object.keys(vendasFormatadas[0]).forEach((key) => keys.push(key))

      const csvParser = new Parser({ fields: keys })
      const csv = csvParser.parse(vendasFormatadas)

      response.header('Content-Type', 'text/csv')
      response.header('Content-Disposition', 'attachment; filename="vendas.csv"')

      return response.status(200).send(csv)
    } catch (error) {
      throw error
    }
  }
}
