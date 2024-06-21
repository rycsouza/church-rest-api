import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Situacao extends BaseModel {
  static table = 'situacao'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare descricao: string
}
