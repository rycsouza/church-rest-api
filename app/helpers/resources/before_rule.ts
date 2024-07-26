import Constants from '#models/constants'
import { ActionContext, ActionRequest } from 'adminjs'

export default (request: ActionRequest, context: ActionContext) => {
  const { query = {} } = request

  if (context.currentAdmin?.usuario.perfil > Constants.Perfis['Server_Administrador'])
    return request

  //Se não for admin do servidor, deve retornar apenas coisas que são da igreja do usuário
  const newQuery = {
    ...query,
    ['filters.church_id']: 1,
  }

  request.query = newQuery

  return request
}
