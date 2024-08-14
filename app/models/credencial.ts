import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Church from './church.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { GenericTypeSelector } from '../helpers/utils/index.js'

export default class Credencial extends BaseModel {
  static table = 'credencial'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tag: string

  @column({ columnName: 'church_id' })
  declare churchId: number
  @belongsTo(() => Church, {
    foreignKey: 'churchId',
  })
  declare church: BelongsTo<typeof Church>

  @column()
  declare gateway: string

  @column()
  declare descricao: string

  @column({
    columnName: 'credencial_json',
    prepare: (value) => GenericTypeSelector({ chosenType: 'string', value }),
    consume: (value) => GenericTypeSelector({ chosenType: 'string', value }),
  })
  declare credencialJson: string

  @column.dateTime({ autoCreate: true, columnName: 'data_cadastro' })
  declare dataCadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'data_atualizacao' })
  declare dataAtualizacao: DateTime
}
