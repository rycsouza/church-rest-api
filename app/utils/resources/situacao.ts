import Constants from '#models/constants'

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
