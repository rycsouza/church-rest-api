import Church from '#models/church'

export default async (id: number) => {
  try {
    const church = await Church.findBy({ id })

    if (!church) throw new Error('Igrejas não encontradas!')

    return { church }
  } catch (error) {
    throw error
  }
}
