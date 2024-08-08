import Evento from '#models/evento'

interface EventoPayLoad {
  nome: string
  valor: number | undefined
  parcelamento: number | undefined
  imagem: string | undefined
  dataEvento: string | Date
  formularioJson: string
  churchId: number
  ativo: number
}

export default async (eventoPayLoad: EventoPayLoad) => {
  try {
    eventoPayLoad.dataEvento = new Date(eventoPayLoad.dataEvento)

    const eventoExistente = await Evento.query()
      .where('data_evento', eventoPayLoad.dataEvento)
      .andWhere('church_id', eventoPayLoad.churchId)
      .andWhere('ativo', 1)

    if (eventoExistente[0]) return { evento: eventoExistente[0] }

    //@ts-ignore
    const evento = await Evento.create(eventoPayLoad)

    return { evento, messagem: 'Evento criado com sucesso!' }
  } catch (error) {
    throw error
  }
}
