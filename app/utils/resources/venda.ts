import { Components } from '../../admin/component_loader.js'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'
import Constants from '#models/constants'
import { ActionContext, ActionRequest, ActionResponse } from 'adminjs'

export default {
  modelName: 'Venda',
  id: 'Vendas',
  label: 'Vendas',
  titleProperty: 'detalheJson.nome',
  Navigation: {
    icon: 'ShoppingBag',
  },
  Sort: {
    direction: 'asc',
    sortBy: 'id',
  },
  Properties: {
    id: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    dataCadastro: {
      isVisible: { show: true },
    },
    dataAtualizacao: {
      isVisible: { show: true },
    },
    empresaId: {
      type: 'reference',
      reference: 'Empresas',
      isRequired: true,
      isVisible: true,
    },
    formularioId: {
      type: 'reference',
      reference: 'Formularios',
      isRequired: true,
      isVisible: true,
    },
    situacaoId: {
      type: 'reference',
      reference: 'Situacoes',
      isRequired: true,
      isVisible: true,
    },
    valor: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    formaPagamento: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    gateway: {
      isVisible: { show: true, new: true, edit: true, list: false },
    },
    detalheJson: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
  },
  Actions: {
    list: {
      before: [BeforeRule],
      after: (originalResponse: any) => {
        originalResponse.records.forEach((record: any) => {
          record.params.detalheJson = JSON.parse(record.params.detalheJson).nome
        })

        return originalResponse
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.list })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.show })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.edit })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.delete })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.new })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.bulkDelete })
      },
    },
    downloadCSV: {
      component: Components.DOWNLOAD_CSV,
      icon: 'DownloadCloud',
      handler: (_request: ActionRequest, _response: ActionResponse, context: ActionContext) => {
        const { record, currentAdmin } = context

        return { record: record?.toJSON(currentAdmin) }
      },
      isAcessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Vendas.list })
      },
    },
  },
}
