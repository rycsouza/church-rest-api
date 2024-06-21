import vine from '@vinejs/vine'

export const InscricaoCreateValidator = vine.compile(
  vine.object({
    eventoId: vine.number().positive(),
    inscricaoJson: vine.string().trim(),
  })
)

export const InscricaoUpdateValidator = vine.compile(
  vine.object({
    eventoId: vine.number().positive().optional(),
    inscricaoJson: vine.string().trim().optional(),
  })
)
