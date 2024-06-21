import Evento from '#models/evento'

interface EventoPayLoad {
  nome: string | undefined
  valor: number | undefined
  parcelamento: number | undefined
  imagem: string | undefined
  dataEvento: string | undefined
  formularioJson: string | undefined
  churchId: number | undefined
}

export default async (id: number, eventoPayLoad: EventoPayLoad) => {
  try {
    const evento = await Evento.findBy({ id })

    if (!evento) throw new Error('Evento não encontrado!')

    evento.merge(eventoPayLoad)
    await evento.save()

    return { evento, messagem: 'Evento atualizado com sucesso!' }
  } catch (error) {
    throw error
  }
}
