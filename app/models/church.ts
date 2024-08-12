import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { GenericTypeSelector } from '../helpers/utils/index.js'

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

  @column({
    columnName: 'config_json',
    consume: (value) => GenericTypeSelector({ chosenType: 'string', value }),
    prepare: (value) => GenericTypeSelector({ chosenType: 'string', value }),
  })
  declare configJson: JSON

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
