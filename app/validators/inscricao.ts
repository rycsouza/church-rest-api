import vine from '@vinejs/vine'

export const InscricaoCreateValidator = vine.compile(
  vine.object({
    evento_id: vine.number().positive(),
    inscricao_json: vine.string().trim(),
  })
)

export const InscricaoUpdateValidator = vine.compile(
  vine.object({
    evento_id: vine.number().positive().optional(),
    inscricao_json: vine.string().trim().optional(),
  })
)
