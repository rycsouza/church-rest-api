import Usuario from '#models/usuario'
import { DateTime } from 'luxon'

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
    const usuario = await Usuario.create({
      nome: usuarioPayload.nome,
      cpf: usuarioPayload.cpf,
      email: usuarioPayload.email,
      senha: senha,
      telefone: usuarioPayload.telefone,
      data_nascimento: DateTime.fromFormat(usuarioPayload.data_nascimento, 'dd/MM/yyyy').toFormat(
        'yyyy-MM-dd HH:mm:ss'
      ),
      avatar: avatar,
    })

    return {
      usuario: { id: usuario.id, nome: usuario.nome, data_nascimento: usuario.data_nascimento },
    }
  } catch (error) {
    throw error
  }
}
