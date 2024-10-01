import { ActionContext } from 'adminjs'
import { CheckAccess } from '../../helpers/resources/index.js'
import Constants from '#models/constants'

export default {
  modelName: 'Perfil',
  id: 'Perfis',
  label: 'Perfis',
  titleProperty: 'descricao',
  Navigation: {
    icon: 'Smile',
  },
  Sort: {
    direction: 'asc',
    sortBy: 'id',
  },
  Properties: {
    id: {
      isVisible: true,
    },
    descricao: {
      isVisible: true,
    },
  },
  Actions: {
    list: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Perfis.list })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Perfis.show })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Perfis.edit })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Perfis.delete })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Perfis.new })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Perfis.bulkDelete })
      },
    },
  },
}
