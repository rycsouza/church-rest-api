import Constants from '#models/constants'

export default {
  modelName: 'Evento',
  id: 'Eventos',
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
      isVisible: {
        show: true,
      },
    },
    dataAtualizacao: {
      isVisible: {
        show: true,
      },
    },
    imagem: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    formularioJson: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    parcelamento: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    cor: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    dataEvento: {
      isVisible: true,
    },
    churchId: {
      type: 'reference',
      reference: 'Igrejas',
      isRequired: true,
      isVisible: true,
    },
    urlWhatsapp: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    urlLocalizacao: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    idadeMinima: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
  },
  Actions: {
    list: {
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Obreiro
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
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Administrador
      },
    },
  },
}
