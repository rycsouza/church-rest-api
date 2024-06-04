import Usuario from '#models/usuario'

export default async (cpf: string | undefined) => {
  try {
    if (!cpf) throw new Error('É necessário informar o CPF!')

    return { usuario: await Usuario.findBy('cpf', cpf) }
  } catch (error) {
    throw error
  }
}
