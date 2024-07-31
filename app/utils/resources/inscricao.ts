import { ActionContext, ActionRequest } from 'adminjs'
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'

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
        list: true,
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
        list: false,
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
      before: [BeforeRule],
      after: [
        (originalResponse: any, _request: ActionRequest, _context: ActionContext) => {
          originalResponse.records.forEach((record: any) => {
            const inscricao = JSON.parse(record.params.inscricaoJson).camposInscricao

            record.params.inscricaoJson = inscricao.nome
          })

          return originalResponse
        },
      ],
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Obreiro' })
      },
    },
    show: {
      after: [
        (originalResponse: any, _request: ActionRequest, _context: ActionContext) => {
          originalResponse.records.forEach((record: any) => {
            const inscricao = JSON.parse(record.params.inscricaoJson).camposInscricao

            record.params.inscricaoJson = inscricao.nome
          })

          return originalResponse
        },
      ],
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Usuario' })
      },
    },
    edit: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Obreiro' })
      },
    },
    delete: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Server_Administrador' })
      },
    },
    new: {
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Obreiro' })
      },
    },
    bulkDelete: {
      isAccessible: false,
    },
  },
}
