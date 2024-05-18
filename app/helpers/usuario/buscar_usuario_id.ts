import Usuario from '#models/usuario'

export default async (id: number | undefined) => {
  return id ? await Usuario.findBy('id', id) : null
}
