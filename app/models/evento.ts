import Church from './church.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { GenericTypeSelector } from '../helpers/utils/index.js'

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

  @column({
    columnName: 'formulario_json',
    //Fazendo tratamento para o Painel
    prepare: (value) => GenericTypeSelector({ chosenType: 'string', value }),
    consume: (value) => GenericTypeSelector({ chosenType: 'string', value }),
  })
  declare formularioJson: JSON

  @column({ columnName: 'church_id' })
  declare churchId: number
  @belongsTo(() => Church, {
    foreignKey: 'church_id',
  })
  declare church: BelongsTo<typeof Church>

  @column()
  declare ativo: number

  @column({
    //Fazendo tratamento para o Painel
    prepare: (value) => GenericTypeSelector({ chosenType: 'string', value }),
    consume: (value) => GenericTypeSelector({ chosenType: 'string', value }),
  })
  declare cor: JSON

  @column({ columnName: 'url_whatsapp' })
  declare urlWhatsapp: string

  @column({ columnName: 'url_localizacao' })
  declare urlLocalizacao: string

  @column({ columnName: 'idade_minima' })
  declare idadeMinima: number

  @column({ columnName: 'nome_grupo' })
  declare nomeGrupo: string

  @column({ columnName: 'data_cadastro' })
  declare dataCadastro: string

  @column({ columnName: 'data_atualizacao' })
  declare dataAtualizacao: string
}
