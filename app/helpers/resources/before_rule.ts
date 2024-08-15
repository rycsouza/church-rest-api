import Constants from '#models/constants'
import { ActionContext, ActionRequest } from 'adminjs'

export default (request: ActionRequest, context: ActionContext) => {
  const { query = {} } = request
  const { currentAdmin, resource } = context
  const { churchId, perfilId } = currentAdmin!
  const resourceHasPracaId = resource
    .properties()
    .find((property) => property.path() === 'churchId')

  if ((!churchId || !resourceHasPracaId) && perfilId === Constants.Perfis.Server_Administrador)
    return request

  //Se não for admin do servidor, deve retornar apenas coisas que são da igreja do usuário
  request.query = { ...query, ['filters.churchId']: churchId }

  return request
}
