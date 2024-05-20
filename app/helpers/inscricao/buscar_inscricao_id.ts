import Inscricao from '#models/inscricao'

export default async (id: number | undefined) => {
  try {
    if (!id) throw new Error('O ID precisa ser informado!')

    return { inscricao: await Inscricao.findBy('id', id) }
  } catch (error) {
    throw error
  }
}
