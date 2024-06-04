import Inscricao from '#models/inscricao'

export default async (id: number | undefined) => {
  try {
    if (!id) throw new Error('O ID do responsável precisa ser informado!')

    return { inscricao: await Inscricao.findBy('responsavel_id', id) }
  } catch (error) {
    throw error
  }
}
