import Evento from '#models/evento'
import Usuario from '#models/usuario'

export default async (usuario: Usuario) => {
  try {
    let evento: Evento[] = []

    evento = usuario?.church_id
      ? await Evento.query().where('church_id', usuario?.church_id).andWhere('ativo', 1)
      : await Evento.all()

    if (!evento[0]) throw new Error('Sem eventos encontrados!')

    return { evento }
  } catch (error) {
    throw error
  }
}
