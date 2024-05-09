import Evento from '#models/evento'
import Usuario from '#models/usuario'

export default async (id: number, usuario?: Usuario) => {
  try {
    const evento: Evento | null = await Evento.findBy({ id })

    if (
      !evento ||
      evento.ativo === 0 ||
      (usuario?.church_id && evento.church_id !== usuario?.church_id)
    )
      throw new Error('Evento não encontrado!')

    return { evento }
  } catch (error) {
    throw error
  }
}
