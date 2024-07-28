import { ActionContext } from 'adminjs'
import { CheckAccess } from '../../helpers/resources/index.js'

export default {
  modelName: 'Perfil',
  id: 'Perfis',
  titleProperty: 'descricao',
  Navigation: {
    name: 'Administracao',
    icon: 'Users',
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
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Usuario' })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      }
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
  },
}
