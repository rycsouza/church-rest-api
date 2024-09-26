import Arquivo from '#models/arquivo'
import Usuario from '#models/usuario'

import type { HttpContext } from '@adonisjs/core/http'
import { Upload } from '../helpers/arquivo/index.js'
import Empresa from '#models/empresa'
import Formulario from '#models/formulario'

const models = {
  Usuarios: Usuario,
  Empresas: Empresa,
  Formularios: Formulario,
}

export default class ArquivosController {
  async upload({ request }: HttpContext) {
    try {
      const { path, id, attribute, imageDevice } = request.all()

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

      if (!imageDevice) {
        register[attribute] = arquivo.url
      } else {
        const registerAttributeJson = JSON.parse(register[attribute])
        registerAttributeJson.images = {
          ...registerAttributeJson.images,
          [imageDevice]: arquivo.url,
        }

        register[attribute] = registerAttributeJson
      }
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
