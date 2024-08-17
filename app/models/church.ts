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
  declare configJson: object

  @column.dateTime({
    autoCreate: true,
    serializeAs: null,
    columnName: 'data_cadastro',
    prepare: (value: DateTime | string) => {
      if (value instanceof DateTime) {
        return value.toFormat('yyyy-MM-dd HH:mm:ss')
      }
      return value
    },
  })
  declare dataCadastro: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'data_atualizacao',
    prepare: (value: DateTime | string) => {
      if (value instanceof DateTime) {
        return value.toFormat('yyyy-MM-dd HH:mm:ss')
      }
      return value
    },
  })
  declare dataAtualizacao: DateTime
}
