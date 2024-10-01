import Constants from '#models/constants'
import { Components } from '../../admin/component_loader.js'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'
import { ActionContext, ActionRequest, ActionResponse } from 'adminjs'

export default {
  modelName: 'Usuario',
  id: 'Usuarios',
  label: 'Usuários',
  titleProperty: 'nome',
  Navigation: {
    icon: 'Users',
  },
  Sort: {
    direction: 'asc',
    sortBy: 'id',
  },
  Properties: {
    email: {
      isVisible: { show: true, new: true, edit: true },
    },
    dataCadastro: {
      isVisible: { show: true },
    },
    dataAtualizacao: {
      isVisible: { show: true },
    },
    dataNascimento: {
      isVisible: { show: true, new: true, edit: true },
    },
    senha: {
      isVisible: { new: true, edit: true },
    },
    avatar: {
      isVisible: {
        show: true,
      },
    },
    empresaId: {
      type: 'reference',
      reference: 'Empresas',
      isRequired: true,
      isVisible: true,
    },
    perfilId: {
      type: 'reference',
      reference: 'Perfis',
      isRequired: true,
      isVisible: true,
    },
  },
  Actions: {
    list: {
      before: [BeforeRule],
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.list })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.show })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.edit })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.delete })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.new })
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
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.new })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Usuarios.bulkDelete })
      },
    },
  },
}
