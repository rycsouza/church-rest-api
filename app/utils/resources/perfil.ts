import Constants from '#models/constants'

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
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId === Constants.Perfis.Server_Administrador
      },
    },
    show: {
      isAccessible: true,
    },
    edit: {
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Server_Administrador
      },
    },
    new: {
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Server_Administrador
      },
    },
  },
}
