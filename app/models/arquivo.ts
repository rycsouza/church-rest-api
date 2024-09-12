import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Arquivo extends BaseModel {
  static table = 'arquivo'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare url: string
}
