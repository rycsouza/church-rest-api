import Church from '#models/church'

export default async (id: number) => {
  try {
    const church = await Church.findBy({ id })

    if (!church) throw new Error('Igrejas não encontradas!')

    await church.delete()

    return { church, mensagem: 'Igreja excluída com sucesso!' }
  } catch (error) {
    throw error
  }
}
