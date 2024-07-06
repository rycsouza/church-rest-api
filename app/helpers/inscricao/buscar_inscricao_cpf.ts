import Inscricao from '#models/inscricao'
import Situacao from '#models/situacao'
import { BuscarEventoIdHelper } from '../evento/index.js'

export default async ({ cpf, eventoId }: any) => {
  try {
    if (!cpf || !eventoId) throw new Error('O ID do responsável precisa ser informado!')

    const { evento } = await BuscarEventoIdHelper(eventoId)

    const inscricoes = await Inscricao.query()
      .whereRaw(`JSON_EXTRACT(inscricao_json, '$.camposInscricao.cpf') = '${cpf}'`)
      .andWhere('evento_id', eventoId)

    if (inscricoes?.length === 0) return { inscricoes }

    let inscricoesFormatadas: any = []
    await Promise.all(
      inscricoes.map(async (inscricao) => {
        inscricao.inscricaoJson =
          typeof inscricao.inscricaoJson === 'string'
            ? JSON.parse(inscricao.inscricaoJson)
            : inscricao.inscricaoJson

        // eslint-disable-next-line unicorn/no-await-expression-member
        const status = (await Situacao.findBy('id', inscricao.situacaoId))?.descricao

        inscricoesFormatadas.push({ status, whatsapp: evento.urlWhatsapp, inscricao })
      })
    )
    return { inscricoes: inscricoesFormatadas }
  } catch (error) {
    throw error
  }
}
