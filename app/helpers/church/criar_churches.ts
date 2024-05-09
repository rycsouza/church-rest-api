import Church from '#models/church'

interface ChurchPayLoad {
  nome: string
  cidade: string
  UF: string
}

export default async (churchPayLoad: ChurchPayLoad) => {
  try {
    const churchExistente = await Church.query()
      .where('nome', churchPayLoad.nome)
      .andWhere('cidade', churchPayLoad.cidade)
      .andWhere('UF', churchPayLoad.UF)

    if (churchExistente[0]) return { church: churchExistente[0] }

    const church = await Church.create(churchPayLoad)

    return { church, messagem: 'Igreja criada com sucesso!' }
  } catch (error) {
    throw error
  }
}
