import { ActionContext } from 'adminjs'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'

export default {
  modelName: 'Usuario',
  id: 'Usuarios',
  titleProperty: 'nome',
  Navigation: {
    name: 'Administracao',
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
        edit: true,
        show: true,
        new: true,
      },
    },
    churchId: {
      type: 'reference',
      reference: 'Igrejas',
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
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
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
