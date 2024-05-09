import Church from '#models/church'

export default async () => {
  try {
    const church = await Church.all()

    if (!church[0]) throw new Error('Igrejas não encontradas!')

    return { church }
  } catch (error) {
    throw error
  }
}
