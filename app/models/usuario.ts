import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

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

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare telefone: string

  @column()
  declare data_nascimento: string

  @column()
  declare avatar: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare data_cadastro: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare data_atualizacao: DateTime
}
