import Inscricao from '#models/inscricao'

export default async (id: number | undefined) => {
  try {
    if (!id) throw new Error('O ID do responsável precisa ser informado!')

    const inscricao = await Inscricao.findBy('responsavelId', id)

    if (!inscricao) throw Error('Inscrição não encontrada')

    inscricao.inscricaoJson =
      typeof inscricao.inscricaoJson === 'string'
        ? JSON.parse(inscricao.inscricaoJson)
        : inscricao.inscricaoJson

    return { inscricao }
  } catch (error) {
    throw error
  }
}
