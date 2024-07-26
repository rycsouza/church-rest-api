import Constants from '#models/constants'
import { ActionContext } from 'adminjs'

export default ({ context, perfil }: { context: ActionContext; perfil: string }) => {
  const usuario = context.currentAdmin?.usuario

  //@ts-ignorew
  return usuario.perfilId >= Constants.Perfis[perfil]
}
