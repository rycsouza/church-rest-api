import { BuscarEventoIdHelper } from '../evento/index.js'
import { CriarUsuarioHelper } from '../usuario/index.js'
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'

interface InscricaoPayLoad {
  evento_id: number
  inscricao_json: JSON | string
}

export default async (inscricaoPayLoad: InscricaoPayLoad) => {
  try {
    const inscricaoJSON: any =
      typeof inscricaoPayLoad.inscricao_json === 'string'
        ? JSON.parse(inscricaoPayLoad.inscricao_json)
        : inscricaoPayLoad.inscricao_json

    const usuarioData: {
      cpf: string
      email: string
      telefone: string
      nome: string
      data_nascimento: string
    } = inscricaoJSON

    Object.keys(usuarioData).forEach((key) => {
      if (!key) throw new Error(`${key} é um campo obrigatório!`)
    })

    const { evento } = await BuscarEventoIdHelper(inscricaoPayLoad.evento_id)

    const { usuario } = await CriarUsuarioHelper({
      nome: usuarioData.nome,
      cpf: usuarioData.cpf,
      email: usuarioData.email,
      telefone: usuarioData.telefone,
      data_nascimento: usuarioData.data_nascimento,
      senha: undefined,
      avatar: undefined,
      church_id: evento!.church_id,
    })

    let inscricao = await Inscricao.query()
      .where('evento_id', evento.id)
      .andWhere('responsavel_id', usuario.id)
      .first()

    if (!inscricao) {
      inscricao = await Inscricao.create({
        evento_id: evento.id,
        responsavel_id: usuario.id,
        situacao_id: Constants.Situacao.Pendente,
        inscricao_json: inscricaoJSON,
      })
    }

    return { inscricao }
  } catch (error) {
    console.log(error)
    throw error
  }
}
