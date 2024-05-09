import Church from '#models/church'

interface ChurchPayLoad {
  nome: string | undefined
  cidade: string | undefined
  UF: string | undefined
}

export default async (id: number, churchPayLoad: ChurchPayLoad) => {
  try {
    const church = await Church.findBy({ id })

    if (!church) throw new Error('Igreja não encontrada')

    church.merge(churchPayLoad)
    await church.save()

    return { church, messagem: 'Igreja atualizada com sucesso!' }
  } catch (error) {
    throw error
  }
}
