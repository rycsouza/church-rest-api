import Constants from '#models/constants'

export default {
  modelName: 'Usuario',
  id: 'Usuarios',
  titleProperty: 'nome',
  Navigation: {
    name: 'Administração',
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
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId === Constants.Perfis.Server_Administrador
      },
    },
    show: {
      isAccessible: true,
    },
    edit: {
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Administrador
      },
    },
    new: {
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId === Constants.Perfis.Server_Administrador
      },
    },
  },
}
