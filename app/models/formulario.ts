import Empresa from './empresa.js'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Formulario extends BaseModel {
  static table = 'formulario'

  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true, columnName: 'data_cadastro' })
  declare dataCadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'data_atualizacao' })
  declare dataAtualizacao: DateTime

  @column({ columnName: 'empresa_id' })
  declare empresaId: number
  @belongsTo(() => Empresa, {
    foreignKey: 'empresaId',
  })
  declare empresa: BelongsTo<typeof Empresa>

  @column()
  declare tipo: string

  @column()
  declare tag: string

  @column({
    columnName: 'config_json',
    prepare: (valor) => (typeof valor === 'string' ? JSON.parse(valor) : valor),
    consume: (valor) => (typeof valor === 'object' ? JSON.stringify(valor) : valor),
  })
  declare configJson: JSON

  @column()
  declare ativo: boolean

  @beforeCreate()
  static async createTag(formulario: Formulario) {
    await formulario.load('empresa')

    let isTagAvailable = false
    let tag = `${formulario.tipo}-${formulario.empresa.nome}`
    let attempt = 0
    const maxAttempts = 10

    while (!isTagAvailable && attempt < maxAttempts) {
      const formularioExistente = await Formulario.findBy({ tag })

      if (!formularioExistente) {
        formulario.tag = tag
        isTagAvailable = true
      } else {
        const randomChar = Math.random().toString(36).substring(2, 7)
        tag = `${formulario.tipo}-${formulario.empresa.nome}-${randomChar}`
      }

      attempt++
    }

    if (!isTagAvailable) {
      throw new Error('Não foi possível gerar uma tag disponível após várias tentativas.')
    }
  }
}
