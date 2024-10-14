import { BuscarEventoIdHelper } from '../evento/index.js'
import Inscricao from '#models/inscricao'
import Situacao from '#models/situacao'

export default async ({ cpf, eventoId }: any) => {
  try {
    if (!cpf || !eventoId) throw new Error('O CPF e o ID do Evento precisam ser informados!')

    const { evento } = await BuscarEventoIdHelper(eventoId)

    const inscricoes = await Inscricao.query()
      .whereRaw(`JSON_EXTRACT(inscricao_json, '$.camposInscricao.cpf') = '${cpf}'`)
      .andWhere('evento_id', eventoId)

    if (inscricoes?.length === 0) return { inscricoes }

    let inscricoesFormatadas: any = []
    await Promise.all(
      inscricoes.map(async (inscricao) => {
        //@ts-ignore
        const inscricaoJSON = JSON.parse(inscricao.inscricaoJson)

        // eslint-disable-next-line unicorn/no-await-expression-member
        const status = (await Situacao.findBy('id', inscricao.situacaoId))?.descricao

        // const { payment } = await CriarPagamento({
        //   inscricaoId: inscricao.id,
        //   eventoId: evento.id,
        //   formaPagamento: 'checkout',
        //   usuario: {
        //     cpf: inscricaoJSON.camposInscricao.cpf,
        //     nome: inscricaoJSON.camposInscricao.nome,
        //     email: inscricaoJSON.camposInscricao.email,
        //     telefone: inscricaoJSON.camposInscricao.telefone,
        //   },
        //   externalReference: inscricao.id.toString(),
        // })

        inscricao.inscricaoJson = inscricaoJSON
        inscricoesFormatadas.push({
          status,
          whatsapp: evento.urlWhatsapp,
          //url_checkout: payment?.url,
          inscricao,
        })
      })
    )
    return { inscricoes: inscricoesFormatadas }
  } catch (error) {
    throw error
  }
}
