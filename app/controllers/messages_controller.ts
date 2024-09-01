//@ts-nocheck
import Inscricao from '#models/inscricao'
import env from '#start/env'

import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import { Sleep } from '../helpers/utils/index.js'
const URL_COMUNICACAO_API = env.get('URL_COMUNICACAO_API')

const TIME_TO_SLEEP = env.get('TIME_TO_SLEEP') ? Number.parseInt(env.get('TIME_TO_SLEEP')!) : 10000

export default class MessagesController {
  async sendText({ request }: HttpContext) {
    try {
      const { message } = request.all()

      if (!message) throw new Error('Mensagem é obrigatório!')

      const inscricoes = await Inscricao.all()

      let inscricoesAfetadas = []
      await Promise.all(
        inscricoes.map(async (inscricao) => {
          const dadosInscricao = JSON.parse(inscricao.inscricaoJson).camposInscricao

          if (dadosInscricao.telefone) {
            if (!dadosInscricao.cidade) {
              await axios.post(`${URL_COMUNICACAO_API}/whatsapp/text`, {
                params: {
                  telefone: dadosInscricao.telefone,
                },
                templateTag: 'recuperar-cidade',
              })
              inscricoesAfetadas.push({
                nome: dadosInscricao.nome,
                telefone: dadosInscricao.telefone,
                tag: 'CIDADE',
              })

              await Sleep(TIME_TO_SLEEP)
            }

            if (!dadosInscricao.camiseta) {
              await axios.post(`${URL_COMUNICACAO_API}/whatsapp/text`, {
                params: {
                  telefone: dadosInscricao.telefone,
                },
                templateTag: 'recuperar-camiseta',
              })
              inscricoesAfetadas.push({
                nome: dadosInscricao.nome,
                telefone: dadosInscricao.telefone,
                tag: 'CAMISETA',
              })

              await Sleep(TIME_TO_SLEEP)
            }
          }
        })
      )

      return inscricoesAfetadas
    } catch (error) {
      throw error
    }
  }
}
