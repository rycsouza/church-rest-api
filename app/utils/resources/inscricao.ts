import Constants from '#models/constants'

export default {
  modelName: 'Inscricao',
  id: 'Inscricoes',
  Navigation: {
    name: 'Administracao',
    icon: 'Users',
  },
  Sort: {
    direction: 'asc',
    sortBy: 'id',
  },
  Properties: {
    dataAtualizacao: {
      isVisible: false,
    },
    inscricaoJson: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    mercadoPagoId: {
      isVisible: {
        show: true,
        new: true,
        edit: true,
      },
    },
    dataCadastro: {
      isVisible: {
        list: true,
        show: true,
      },
    },
    eventoId: {
      type: 'reference',
      reference: 'Eventos',
      isRequired: true,
      isVisible: true,
    },
    situacaoId: {
      type: 'reference',
      reference: 'Situacoes',
      isRequired: true,
      isVisible: true,
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
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Obreiro
      },
    },
    new: {
      isAccessible: (context: any) => {
        return context.currentAdmin.usuario.perfilId >= Constants.Perfis.Obreiro
      },
    },
  },
}
