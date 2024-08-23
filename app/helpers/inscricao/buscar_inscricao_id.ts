import Inscricao from '#models/inscricao'

export default async (id: number | undefined) => {
  try {
    if (!id) throw new Error('O ID precisa ser informado!')

    const inscricao = await Inscricao.findBy('id', id)

    if (!inscricao) throw Error('Inscrição não encontrada')

    await inscricao.load('situacao')
    //@ts-ignore
    inscricao.inscricaoJson = JSON.parse(inscricao.inscricaoJson)

    return { inscricao }
  } catch (error) {
    throw error
  }
}
