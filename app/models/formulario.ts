import Empresa from './empresa.js'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Formulario extends BaseModel {
  static table = 'formulario'

  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare data_cadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_atualizacao: DateTime

  @column()
  declare empresa_id: number
  @belongsTo(() => Empresa, {
    foreignKey: 'empresa_id',
  })
  declare Empresa: BelongsTo<typeof Empresa>

  @column()
  declare tipo: string

  @column()
  declare tag: string

  @column()
  declare config_json: string

  @column()
  declare ativo: boolean

  @beforeCreate()
  static async createTag(formulario: Formulario) {
    await formulario.load('Empresa')

    let isTagAvailable = false
    let tag = `${formulario.tipo}-${formulario.Empresa.nome}`
    let attempt = 0
    const maxAttempts = 10

    while (!isTagAvailable && attempt < maxAttempts) {
      const formularioExistente = await Formulario.findBy({ tag })

      if (!formularioExistente) {
        formulario.tag = tag
        isTagAvailable = true
      } else {
        const randomChar = Math.random().toString(36).substring(2, 7)
        tag = `${formulario.tipo}-${formulario.Empresa.nome}-${randomChar}`
      }

      attempt++
    }

    if (!isTagAvailable) {
      throw new Error('Não foi possível gerar uma tag disponível após várias tentativas.')
    }
  }
}
