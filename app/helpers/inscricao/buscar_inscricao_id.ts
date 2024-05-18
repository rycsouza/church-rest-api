import Inscricao from '#models/inscricao'

export default async (id: number | undefined) => {
  return id ? await Inscricao.findBy('id', id) : null
}
