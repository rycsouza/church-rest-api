import { DefaultAuthProvider, DefaultAuthenticatePayload } from 'adminjs'

import componentLoader from './component_loader.js'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

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

  return {
    email,
    usuario,
    avatarUrl: usuario.avatar || '',
  }
}

const authProvider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
})

export default authProvider
