import Inscricao from '#models/inscricao'
import Usuario from '#models/usuario'

export default async (usuario: Usuario | undefined) => {
  try {
    if (!usuario) throw new Error('Você precisa estar autenticado para acessar!')

    return await Inscricao.findBy('church_id', usuario.churchId ?? 1)
  } catch (error) {
    throw error
  }
}
