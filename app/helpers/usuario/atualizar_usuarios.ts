import Usuario from '#models/usuario'

interface UsuarioPayload {
  nome: string | undefined
  cpf: string | undefined
  email: string | undefined
  senha: string | undefined
  telefone: string | undefined
  data_nascimento: string | undefined
  avatar: string | undefined
}

export default async (usuario: Usuario, UsuarioPayload: UsuarioPayload) => {
  try {
    if (!usuario) throw new Error('Usuário não encontrado!')

    await usuario.merge(UsuarioPayload)
    await usuario.save()

    return { usuario }
  } catch (error) {
    throw error
  }
}
