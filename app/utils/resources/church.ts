import Constants from '#models/constants'

export default {
  modelName: 'Church',
  id: 'Igrejas',
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
    dataCadastro: {
      isVisible: { show: true, edit: true, new: true },
    },
    dataAtualizacao: {
      isVisible: { show: true, edit: true, new: true },
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
