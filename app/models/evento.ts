import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Evento extends BaseModel {
  static table = 'evento'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare valor: number

  @column()
  declare parcelamento: number

  @column()
  declare imagem: string | undefined

  @column()
  declare data_evento: string | Date

  @column()
  declare formulario_json: string

  @column()
  declare church_id: number

  @column()
  declare ativo: number

  @column()
  declare cor: string

  @column.dateTime({ autoCreate: true })
  declare data_cadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_atualizacao: DateTime
}
