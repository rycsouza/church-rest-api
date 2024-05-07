import vine from '@vinejs/vine'

const dataRegex = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/
const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/
export const createUsuarioValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6).regex(nomeRegex),
    cpf: vine.string().trim().minLength(11).maxLength(11),
    email: vine.string().trim().email().maxLength(100),
    senha: vine.string().optional(),
    telefone: vine.string().trim().minLength(13).maxLength(13),
    data_nascimento: vine.string().trim().regex(dataRegex),
    avatar: vine.string().optional(),
  })
)

export const updateUsuarioValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6).regex(nomeRegex).optional(),
    cpf: vine.string().trim().minLength(11).maxLength(11).optional(),
    email: vine.string().trim().email().maxLength(100).optional(),
    senha: vine.string().optional(),
    telefone: vine.string().trim().minLength(13).maxLength(13).optional(),
    data_nascimento: vine.string().trim().regex(dataRegex).optional(),
    avatar: vine.string().optional(),
  })
)
