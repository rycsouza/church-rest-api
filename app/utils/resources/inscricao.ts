import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'
import { ActionContext, ActionRequest } from 'adminjs'

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
    churchId: {
      type: 'reference',
      reference: 'Igrejas',
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

            if (inscricao.nome) {
              record.params.inscricaoJson = `${inscricao.nome}`

              if (inscricao.camiseta)
                record.params.inscricaoJson = `${inscricao.nome} - ${inscricao.camiseta}`
            }
          })

          return originalResponse
        },
      ],
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Obreiro' })
      },
    },
    show: {
      //A ideia é fazer cada key ser mostrada individualmente.
      // after: [
      //   (originalResponse: any, _request: ActionRequest, _context: ActionContext) => {
      //     let params = originalResponse.record.params
      //     const inscricaoJSON = JSON.parse(params.inscricaoJson)
      //     const keysInscricao = Object.keys(inscricaoJSON.camposInscricao)
      //     const keysResponsaveis = Object.keys(inscricaoJSON.camposResponsaveis)

      //     const keys = keysInscricao.concat(keysResponsaveis)

      //     delete params.inscricaoJson
      //     keys.forEach((key) => {
      //       if (!inscricaoJSON.camposInscricao[key] && !inscricaoJSON.camposResponsaveis[key])
      //         return
      //       console.log(key)

      //       params = {
      //         ...params,
      //         [key]: inscricaoJSON.camposInscricao[key],
      //       }
      //     })

      //     originalResponse.record.params = params
      //     console.log(originalResponse.record.params)
      //     return originalResponse
      //   },
      // ],
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
