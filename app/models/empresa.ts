import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Empresa extends BaseModel {
  static table = 'empresa'

  @column({ isPrimary: true })
  declare id: number

  @column({
    columnName: 'data_cadastro',
  })
  declare dataCadastro: string

  @column({
    columnName: 'data_atualizacao',
  })
  declare dataAtualizacao: string

  @column()
  declare nome: string

  @column()
  declare contrato: string

  @column({
    columnName: 'config_json',
    prepare: (valor) => (typeof valor === 'object' ? JSON.stringify(valor) : valor),
    consume: (valor) => (typeof valor === 'object' ? JSON.stringify(valor) : valor),
  })
  declare configJson: JSON
}
