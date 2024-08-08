import Evento from '#models/evento'
import Usuario from '#models/usuario'

export default async (usuario: Usuario) => {
  try {
    let eventos: Evento[] = []

    eventos = usuario?.churchId
      ? await Evento.query().where('churchId', usuario?.churchId).andWhere('ativo', 1)
      : await Evento.all()

    if (!eventos[0]) throw new Error('Sem eventos encontrados!')

    eventos.map((evento) => {
      //@ts-ignore
      evento.formularioJson = JSON.parse(evento.formularioJson)
      //@ts-ignore
      evento.cor = JSON.parse(evento.cor)
    })
    return {
      eventos,
    }
  } catch (error) {
    throw error
  }
}
