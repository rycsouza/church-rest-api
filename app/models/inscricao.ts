import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Evento from './evento.js'
import Situacao from './situacao.js'

export default class Inscricao extends BaseModel {
  static table = 'inscricao'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'evento_id' })
  declare eventoId: number
  @belongsTo(() => Evento, {
    foreignKey: 'inscricao_ibfk_2',
  })
  declare evento: BelongsTo<typeof Evento>

  @column({ columnName: 'situacao_id' })
  declare situacaoId: number
  @belongsTo(() => Situacao, {
    foreignKey: 'inscricao_ibfk_3',
  })
  declare situacao: BelongsTo<typeof Situacao>

  @column()
  declare inscricaoJson: JSON | string

  @column({ columnName: 'mercado_pago_id' })
  declare mercadoPagoId: number | undefined

  @column.dateTime({ autoCreate: true, columnName: 'data_cadastro' })
  declare dataCadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'data_atualizacao' })
  declare dataAtualizacao: DateTime
}
