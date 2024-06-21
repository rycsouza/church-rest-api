import Usuario from '#models/usuario'

interface UsuarioPayload {
  nome: string
  cpf: string
  email: string
  senha: string | undefined
  telefone: string
  data_nascimento: string
  avatar: string | undefined
  churchId: number
}

export default async (usuarioPayload: UsuarioPayload) => {
  const senha = usuarioPayload.senha ?? undefined
  const avatar = usuarioPayload.avatar ?? undefined

  try {
    const usuarioExistente = await Usuario.query().where('cpf', usuarioPayload.cpf).first()

    if (usuarioExistente) return { usuario: usuarioExistente }

    const usuario = await Usuario.create({
      nome: usuarioPayload.nome,
      cpf: usuarioPayload.cpf,
      email: usuarioPayload.email,
      senha: senha,
      telefone: usuarioPayload.telefone,
      data_nascimento: Usuario.setDataNascimento(usuarioPayload.data_nascimento),
      avatar: avatar,
      churchId: usuarioPayload.churchId,
    })

    return {
      usuario: usuario,
    }
  } catch (error) {
    throw error
  }
}
