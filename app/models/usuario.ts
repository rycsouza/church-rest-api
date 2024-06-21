import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Church from './church.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Perfil from './perfil.js'

const AuthFinder = withAuthFinder(() => hash.use('bcrypt'), {
  uids: ['email', 'cpf', 'telefone'],
  passwordColumnName: 'senha',
})

export default class Usuario extends compose(BaseModel, AuthFinder) {
  static table = 'usuario'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column()
  declare email: string

  @column({ serializeAs: null, columnName: 'senha' })
  declare senha: string

  @column()
  declare telefone: string

  @column({ columnName: 'data_nascimento' })
  declare dataNascimento: string | Date

  @column()
  declare avatar: string | null

  @column({ columnName: 'church_id' })
  declare churchId: number
  @belongsTo(() => Church, {
    foreignKey: 'usuario_ibfk_1',
  })
  declare church: BelongsTo<typeof Church>

  @column({ columnName: 'perfil_id' })
  declare perfilId: number
  @belongsTo(() => Perfil, {
    foreignKey: 'usuario_ibfk_2',
  })
  declare perfil: BelongsTo<typeof Perfil>

  @column({ serializeAs: null, columnName: 'data_cadastro' })
  declare dataCadastro: string

  @column({ serializeAs: null, columnName: 'data_atualizacao' })
  declare dataAtualizacao: string

  static setDataNascimento(dataNascimento: any) {
    if (!dataNascimento) return
    const [day, month, year] = dataNascimento.split('/')
    return new Date(year, month - 1, day).toISOString().split('T')[0]
  }
}
