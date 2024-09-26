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

  @column({ columnName: 'formulario_id' })
  declare formularioId: number
  @belongsTo(() => Formulario, {
    foreignKey: 'formularioId',
  })
  declare formulario: BelongsTo<typeof Formulario>

  @column()
  declare valor: number

  @column({ columnName: 'forma_pagamento' })
  declare formaPagamento: string

  @column()
  declare gateway: string

  @column({
    columnName: 'detalhe_json',
    prepare: (valor) => (typeof valor === 'string' ? JSON.parse(valor) : valor),
    consume: (valor) => (typeof valor === 'object' ? JSON.stringify(valor) : valor),
  })
  declare detalheJson: JSON

  @column({ columnName: 'situacao_id' })
  declare situacaoId: number
  @belongsTo(() => Situacao, {
    foreignKey: 'situacaoId',
  })
  declare situacao: BelongsTo<typeof Situacao>
}
