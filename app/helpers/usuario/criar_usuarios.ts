import Usuario from '#models/usuario'

interface UsuarioPayload {
  nome: string
  cpf: string
  email: string
  senha: string | undefined
  telefone: string
  data_nascimento: string
  avatar: string | undefined
}

export default async (usuarioPayload: UsuarioPayload) => {
  const senha = usuarioPayload.senha ?? undefined
  const avatar = usuarioPayload.avatar ?? undefined

  try {
    const usuarioExistente = await Usuario.query()
      .where('cpf', usuarioPayload.cpf)
      .orWhere('email', usuarioPayload.email)
      .orWhere('telefone', usuarioPayload.telefone)
      .first()

    if (usuarioExistente) return { usuario: usuarioExistente }

    const usuario = await Usuario.create({
      nome: usuarioPayload.nome,
      cpf: usuarioPayload.cpf,
      email: usuarioPayload.email,
      senha: senha,
      telefone: usuarioPayload.telefone,
      data_nascimento: new Date(usuarioPayload.data_nascimento),
      avatar: avatar,
    })

    return {
      usuario: usuario,
    }
  } catch (error) {
    throw error
  }
}
