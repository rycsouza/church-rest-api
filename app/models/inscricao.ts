import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Inscricao extends BaseModel {
  static table = 'inscricao'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare responsavel_id: number

  @column()
  declare evento_id: number

  @column()
  declare situacao_id: number

  @column()
  declare inscricao_json: JSON | string

  @column()
  declare mercado_pago_id: number | undefined

  @column.dateTime({ autoCreate: true })
  declare data_cadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare data_atualizacao: DateTime
}
