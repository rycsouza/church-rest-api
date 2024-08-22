import Church from './church.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { GenericTypeSelector } from '../helpers/utils/index.js'

export default class Credencial extends BaseModel {
  static table = 'credencial'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tag: string

  @column()
  declare church_id: number
  @belongsTo(() => Church, {
    foreignKey: 'church_id',
  })
  declare situacao: BelongsTo<typeof Church>

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

  @column.dateTime({
    autoCreate: true,
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
