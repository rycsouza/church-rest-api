import Usuario from '#models/usuario'

export default async (id: number | undefined) => {
  try {
    if (!id) throw new Error('É necessário informar o ID!')

    return { usuario: await Usuario.findBy('id', id) }
  } catch (error) {
    throw error
  }
}
