import Evento from '#models/evento'

export default async (id: number) => {
  try {
    const evento = await Evento.findBy({ id })

    if (!evento) throw new Error('Evento não encontrado!')

    evento.ativo = 0
    await evento.save()

    return { messagem: 'Evento desativado com Sucesso!' }
  } catch (error) {
    throw error
  }
}
