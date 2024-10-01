import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Perfil from './perfil.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Empresa from './empresa.js'
import Usuario from './usuario.js'

export default class Permissao extends BaseModel {
  static table = 'permissao'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare descricao: string

  @column()
  declare code: string

  @column()
  declare perfilId: number
  @belongsTo(() => Perfil, {
    foreignKey: 'perfilId',
  })
  declare perfil: BelongsTo<typeof Perfil>

  @column()
  declare empresaId: number
  @belongsTo(() => Empresa, {
    foreignKey: 'empresaId',
  })
  declare empresa: BelongsTo<typeof Empresa>

  @column()
  declare usuarioId: number
  @belongsTo(() => Usuario, {
    foreignKey: 'usuarioId',
  })
  declare usuario: BelongsTo<typeof Usuario>
}
