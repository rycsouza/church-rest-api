import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Perfil extends BaseModel {
  static table = 'perfil'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare descricao: string
}
