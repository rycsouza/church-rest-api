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

    //@ts-ignore
    evento.formularioJson = JSON.parse(evento.formularioJson)
    //@ts-ignore
    evento.cor = JSON.parse(evento.cor)

    return { evento }
  } catch (error) {
    throw error
  }
}
