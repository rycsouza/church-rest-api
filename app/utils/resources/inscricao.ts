//@ts-nocheck
import { BeforeRule, CheckAccess } from '../../helpers/resources/index.js'
import Inscricao from '#models/inscricao'
import env from '#start/env'
import { ActionContext, ActionRequest, ActionResponse } from 'adminjs'
import axios from 'axios'

const URL_COMUNICACAO_API = env.get('URL_COMUNICACAO_API')

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
    addToGroup: {
      actionType: 'record',
      component: false,
      icon: 'UserPlus',
      handler: async (
        _request: ActionRequest,
        _response: ActionResponse,
        context: ActionContext
      ) => {
        const { record, currentAdmin } = context
        const camposInscricao = JSON.parse(record?.params.inscricaoJson).camposInscricao
        const telefone = camposInscricao.telefone

        await axios.post(`${URL_COMUNICACAO_API}/whatsapp/participants/`, {
          nomeGrupo: record?.populated?.eventoId?.params?.nomeGrupo,
          telefones: [telefone],
        })

        return {
          record: record!.toJSON(currentAdmin),
          msg: `${camposInscricao.nome} adicionado ao grupo!`,
        }
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Obreiro' })
      },
    },
    addAllToGroup: {
      actionType: 'resource',
      component: false,
      guard: 'Você tem certeza que quer adicionar todos os inscritos ao grupo do evento?',
      handler: async (
        _request: ActionRequest,
        response: ActionResponse,
        _context: ActionContext
      ) => {
        const records = await Inscricao.all()

        const telefones: any = []
        const nomes: any = []
        records.forEach((record) => {
          const camposInscricao = JSON.parse(record.inscricaoJson).camposInscricao
          telefones.push(camposInscricao.telefone)
          nomes.push(camposInscricao.nome)
        })

        await records[0].load('evento')

        if (records[0].evento.nomeGrupo && telefones.length) {
          await axios.post(`${URL_COMUNICACAO_API}/whatsapp/participants/`, {
            nomeGrupo: records[0].evento.nomeGrupo,
            telefones,
          })
        }

        return {
          records: records,
          redirectUrl: '/admin/',
          msg: `${nomes} adicionados ao grupo!`,
        }
      },
      isAccessible: (context: ActionContext) => {
        return CheckAccess({ context, perfil: 'Obreiro' })
      },
    },
    bulkDelete: {
      isAccessible: false,
    },
  },
}
