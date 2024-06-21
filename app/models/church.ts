import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Church extends BaseModel {
  static table = 'church'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cidade: string

  @column({ columnName: 'UF' })
  declare uf: string

  @column()
  declare logo: string

  @column.dateTime({ autoCreate: true, serializeAs: null, columnName: 'data_cadastro' })
  declare dataCadastro: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'data_atualizacao',
  })
  declare dataAtualizacao: DateTime
}
