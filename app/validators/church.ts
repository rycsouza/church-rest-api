import vine from '@vinejs/vine'

export const ChurchCreateValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    cidade: vine.string().trim(),
    UF: vine.string().trim().minLength(2).maxLength(2),
  })
)

export const ChurchUpdateValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().optional(),
    cidade: vine.string().trim().optional(),
    UF: vine.string().trim().minLength(2).maxLength(2).optional(),
  })
)
