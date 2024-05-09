import Evento from '#models/evento'

interface EventoPayLoad {
  nome: string
  valor: number | undefined
  parcelamento: number | undefined
  imagem: string | undefined
  data_evento: string | Date
  formulario_json: string
  church_id: number
  ativo: number
}

export default async (eventoPayLoad: EventoPayLoad) => {
  try {
    eventoPayLoad.data_evento = new Date(eventoPayLoad.data_evento)

    const eventoExistente = await Evento.query()
      .where('data_evento', eventoPayLoad.data_evento)
      .andWhere('church_id', eventoPayLoad.church_id)
      .andWhere('ativo', 1)

    if (eventoExistente[0]) return { evento: eventoExistente[0] }

    const evento = await Evento.create(eventoPayLoad)

    return { evento }
  } catch (error) {
    throw error
  }
}
