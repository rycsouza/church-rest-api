import Constants from '#models/constants'
import { ActionContext, ActionRequest } from 'adminjs'

export default (request: ActionRequest, context: ActionContext) => {
  const { query = {} } = request
  const { usuario } = context.currentAdmin!

  if (usuario.perfilId === Constants.Perfis.Server_Administrador) return request

  //Se não for admin do servidor, deve retornar apenas coisas que são da igreja do usuário
  request.query = { ...query, ['filters.churchId']: usuario.churchId }

  return request
}
