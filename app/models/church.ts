import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Church extends BaseModel {
  static table = 'church'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cidade: string

  @column()
  declare UF: string

  @column.dateTime({ autoCreate: true })
  declare data_cadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_atualizacao: DateTime
}
