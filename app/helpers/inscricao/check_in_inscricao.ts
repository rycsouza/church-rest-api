import Inscricao from '#models/inscricao'

export default async (id: number) => {
  try {
    const inscricao = await Inscricao.findBy({ id })

    if (!inscricao)
      throw new Error('Inscrição não encontrada!', {
        cause: 'Inscrição não cadastrada no sistema!',
      })

    if (inscricao.checkIn)
      throw new Error('Não é possível fazer o check-in da inscrição duas vezes!', {
        cause: 'Inscrição já verificada anteriormente.',
      })

    inscricao.checkIn = true
    await inscricao.save()

    return { success: true, message: 'Check-in realizado com sucesso! Aproveite o evento!' }
  } catch (error) {
    throw error
  }
}
