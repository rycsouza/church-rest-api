import Constants from '#models/constants'
import { Components } from '../../admin/component_loader.js'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'
import { ActionContext, ActionRequest, ActionResponse } from 'adminjs'

export default {
  modelName: 'Formulario',
  id: 'Formularios',
  label: 'Formulários',
  titleProperty: 'tag',
  Navigation: {
    icon: 'Layout',
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
    tipo: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    tag: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    configJson: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    ativo: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
  },
  Actions: {
    list: {
      before: [BeforeRule],
      after: (originalResponse: any) => {
        originalResponse.records.forEach((record: any) => {
          record.params.configJson = JSON.parse(record.params.configJson).nome
        })

        return originalResponse
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.list })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.show })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.edit })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.delete })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.new })
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
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.new })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Formularios.bulkDelete })
      },
    },
  },
}
