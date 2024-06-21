import Evento from '#models/evento'
import Usuario from '#models/usuario'

export default async (id: number, usuario?: Usuario) => {
  try {
    const evento: Evento | null = await Evento.findBy({ id })

    if (
      !evento ||
      evento.ativo === 0 ||
      (usuario?.churchId && evento.churchId !== usuario?.churchId)
    )
      throw new Error('Evento não encontrado!')

    evento.formularioJson =
      typeof evento.formularioJson === 'string'
        ? JSON.parse(evento.formularioJson)
        : evento.formularioJson

    return { evento }
  } catch (error) {
    throw error
  }
}
