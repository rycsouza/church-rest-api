import vine from '@vinejs/vine'

const dataRegex = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/

export const EventoCreateValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6),
    valor: vine.number().positive().optional(),
    parcelamento: vine.number().positive().optional(),
    imagem: vine.string().trim().url().optional(),
    dataEvento: vine.string().trim().regex(dataRegex),
    formularioJson: vine.object({}).allowUnknownProperties(),
    churchId: vine.number().positive(),
  })
)

export const EventoUpdateValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(6).optional(),
    valor: vine.number().decimal(2).positive().optional(),
    parcelamento: vine.number().positive().optional(),
    imagem: vine.string().trim().url().optional(),
    dataEvento: vine.string().trim().regex(dataRegex).optional(),
    formularioJson: vine.object({}).allowUnknownProperties(),
    churchId: vine.number().positive().optional(),
    ativo: vine.number().optional(),
  })
)
