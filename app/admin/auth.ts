import { componentLoader } from './component_loader.js'
import hash from '@adonisjs/core/services/hash'
import Usuario from '#models/usuario'
import { DefaultAuthenticatePayload, DefaultAuthProvider } from 'adminjs'
import Permissao from '#models/permissao'

/**
 * Your "authenticate" function. Depending on the auth provider used, the payload may be different.
 *
 * The default authentication provider uses email and password to authenticate. You can modify this
 * function to use email & password to verify if the User exists and if their passwords match.
 *
 * The default implementation below will let any in, so make sure to update it.
 */
const authenticate = async ({ email, password }: DefaultAuthenticatePayload) => {
  const usuario = await Usuario.findBy({ email })

  if (!usuario?.senha || !(await hash.verify(usuario.senha, password))) return null

  await usuario.load('perfil')

  const permissoes: { code: string }[] = []
  const queryReturn = await Permissao.query()
    .select('permissao.code')
    .where({ perfilId: usuario.perfilId })
    .orWhere({ empresaId: usuario.empresaId })
    .orWhere({ usuarioId: usuario.id })

  if (queryReturn)
    queryReturn.forEach((permissao: Permissao) => permissoes.push({ code: permissao.code }))

  const usuarioJSON = usuario.toJSON()
  usuarioJSON.permissoes = permissoes

  return {
    ...usuarioJSON,
    email,
    avatarUrl: usuario.avatar || '',
    title: usuario.perfil.descricao,
  }
}

const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
})

export default authProvider
