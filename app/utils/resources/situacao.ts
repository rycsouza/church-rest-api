import { ActionContext } from 'adminjs'
import { CheckAccess } from '../../helpers/resources/index.js'
import Constants from '#models/constants'

export default {
  modelName: 'Situacao',
  id: 'Situacoes',
  label: 'Situações',
  titleProperty: 'descricao',
  Navigation: {
    icon: 'Sliders',
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
        return CheckAccess({ context, code: Constants.Permissoes.Situacoes.list })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Situacoes.show })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Situacoes.edit })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Situacoes.delete })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Situacoes.new })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, code: Constants.Permissoes.Situacoes.bulkDelete })
      },
    },
  },
}
