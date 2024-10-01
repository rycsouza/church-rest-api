import Constants from '#models/constants'
import { Components } from '../../admin/component_loader.js'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'
import { ActionContext, ActionRequest, ActionResponse } from 'adminjs'

export default {
  modelName: 'Empresa',
  id: 'Empresas',
  label: 'Empresas',
  titleProperty: 'nome',
  Navigation: {
    icon: 'Database',
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
    contrato: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    configJson: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
  },
  Actions: {
    list: {
      before: [BeforeRule],
      after: (originalResponse: any) => {
        originalResponse.records.forEach((record: any) => {
          record.params.configJson = `checkout: ${JSON.stringify(JSON.parse(record.params.configJson).checkout)}`
        })

        return originalResponse
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.list })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.show })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.edit })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.delete })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.new })
      },
    },
    uploadImage: {
      component: Components.UPLOAD,
      actionType: 'record',
      icon: 'Image',
      handler: (_request: ActionRequest, _response: ActionResponse, context: ActionContext) => {
        const { record, currentAdmin } = context

        return { record: record?.toJSON(currentAdmin) }
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.new })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Empresas.bulkDelete })
      },
    },
  },
}
