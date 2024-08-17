import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Evento from './evento.js'
import Situacao from './situacao.js'
import { GenericTypeSelector } from '../helpers/utils/index.js'
import Church from './church.js'

export default class Inscricao extends BaseModel {
  static table = 'inscricao'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'evento_id' })
  declare eventoId: number
  @belongsTo(() => Evento, {
    foreignKey: 'eventoId',
  })
  declare evento: BelongsTo<typeof Evento>

  @column({ columnName: 'situacao_id' })
  declare situacaoId: number
  @belongsTo(() => Situacao, {
    foreignKey: 'situacaoId',
  })
  declare situacao: BelongsTo<typeof Situacao>

  @column({
    columnName: 'inscricao_json',
    //Fazendo tratamento para o Painel
    prepare: (value) => GenericTypeSelector({ chosenType: 'string', value }),
    consume: (value) => GenericTypeSelector({ chosenType: 'string', value }),
  })
  declare inscricaoJson: JSON

  @column({ columnName: 'mercado_pago_id' })
  declare mercadoPagoId: number | undefined

  @column({ columnName: 'church_id' })
  declare churchId: number
  @belongsTo(() => Church, {
    foreignKey: 'churchId',
  })
  declare church: BelongsTo<typeof Church>

  @column.dateTime({ autoCreate: true, columnName: 'data_cadastro' })
  declare dataCadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'data_atualizacao' })
  declare dataAtualizacao: DateTime
}
