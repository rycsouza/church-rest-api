import { ActionContext } from 'adminjs'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'

export default {
  modelName: 'Venda',
  id: 'Vendas',
  titleProperty: 'detalheJson.nome',
  Navigation: {
    icon: 'ShoppingBag',
  },
  Sort: {
    direction: 'asc',
    sortBy: 'id',
  },
  Properties: {
    id: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    dataCadastro: {
      isVisible: { show: true },
    },
    dataAtualizacao: {
      isVisible: { show: true },
    },
    empresaId: {
      type: 'reference',
      reference: 'Empresas',
      isRequired: true,
      isVisible: true,
    },
    formularioId: {
      type: 'reference',
      reference: 'Formularios',
      isRequired: true,
      isVisible: true,
    },
    situacaoId: {
      type: 'reference',
      reference: 'Situacoes',
      isRequired: true,
      isVisible: true,
    },
    valor: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    formaPagamento: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
    gateway: {
      isVisible: { show: true, new: true, edit: true, list: false },
    },
    detalheJson: {
      isVisible: { show: true, new: true, edit: true, list: true },
    },
  },
  Actions: {
    list: {
      before: [BeforeRule],
      after: (originalResponse: any) => {
        originalResponse.records.forEach((record: any) => {
          record.params.detalheJson = JSON.parse(record.params.detalheJson).nome
        })

        return originalResponse
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Administrador' })
      },
    },
    show: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Administrador' })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Administrador' })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Administrador' })
      },
    },
    bulkDelete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
  },
}
