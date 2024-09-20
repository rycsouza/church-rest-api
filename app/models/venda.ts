import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Empresa from './empresa.js'
import Formulario from './formulario.js'
import Situacao from './situacao.js'

export default class Venda extends BaseModel {
  static table = 'venda'

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
  declare empresa: BelongsTo<typeof Empresa>

  @column()
  declare formulario_id: number
  @belongsTo(() => Formulario, {
    foreignKey: 'formulario_id',
  })
  declare formulario: BelongsTo<typeof Formulario>

  @column()
  declare valor: number

  @column()
  declare forma_pagamento: string

  @column()
  declare gateway: string

  @column()
  declare detalhe_json: JSON

  @column()
  declare situacao_id: number
  @belongsTo(() => Situacao, {
    foreignKey: 'situacao_id',
  })
  declare situacao: BelongsTo<typeof Situacao>
}
