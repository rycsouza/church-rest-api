import Church from './church.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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

  @column({ columnName: 'data_evento' })
  declare dataEvento: string | Date

  @column({ columnName: 'formulario_json' })
  declare formularioJson: string

  @column({ columnName: 'church_id' })
  declare churchId: number
  @belongsTo(() => Church, {
    foreignKey: 'evento_ibfk_1',
  })
  declare church: BelongsTo<typeof Church>

  @column()
  declare ativo: number

  @column()
  declare cor: string

  @column({ columnName: 'url_whatsapp' })
  declare urlWhatsapp: string

  @column({ columnName: 'url_localizacao' })
  declare urlLocalizacao: string

  @column({ columnName: 'data_cadastro' })
  declare dataCadastro: string

  @column({ columnName: 'data_atualizacao' })
  declare dataAtualizacao: string
}
