import type { HttpContext } from '@adonisjs/core/http'
import { Upload } from '../helpers/arquivo/index.js'
import Usuario from '#models/usuario'
import Arquivo from '#models/arquivo'
import Evento from '#models/evento'
import Church from '#models/church'

const models = {
  Usuarios: Usuario,
  Eventos: Evento,
  Igrejas: Church,
}

export default class ArquivosController {
  async upload({ request }: HttpContext) {
    try {
      const { path, id, attribute } = request.all()

      const file = request.file('file')

      const arquivo = await Upload({ file, path })

      if (!arquivo?.url || !arquivo?.nome)
        throw new Error('Não foi possível fazer o upload do Arquivo.')

      await Arquivo.firstOrCreate(
        {
          nome: arquivo.nome,
        },
        { nome: arquivo.nome, url: arquivo.url }
      )

      //@ts-ignore
      const register = await models[path].findBy({ id })
      if (!register) throw new Error('Não foi possível fazer o upload do Arquivo.')

      //@ts-ignore
      register[attribute] = arquivo.url
      await register.save()

      return {
        success: true,
        message: 'Arquivo enviado com sucesso!',
      }
    } catch (error) {
      throw error
    }
  }
}
