import { ActionContext } from 'adminjs'
import { CheckAccess } from '../../helpers/resources/index.js'

export default {
  modelName: 'Situacao',
  id: 'Situacoes',
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
    data_cadastro: {
      isVisible: false,
    },
    data_atualizacao: {
      isVisible: false,
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
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
  },
}
