import { BuscarEventoIdHelper } from '../evento/index.js'
import { CriarUsuarioInscricaoHelper } from '../usuario/index.js'
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'

interface InscricaoPayLoad {
  eventoId: number
  inscricaoJson: JSON | string
}

export default async (inscricaoPayLoad: InscricaoPayLoad) => {
  try {
    const inscricaoJSON: any =
      typeof inscricaoPayLoad.inscricaoJson === 'string'
        ? JSON.parse(inscricaoPayLoad.inscricaoJson)
        : inscricaoPayLoad.inscricaoJson

    const usuarioData: {
      cpf: string
      email: string
      telefone: string
      nome: string
      dataNascimento: string
    } = inscricaoJSON?.camposInscricao?.usuario

    Object.keys(usuarioData).forEach((key) => {
      if (!key) throw new Error(`${key} é um campo obrigatório!`)
    })

    const { evento } = await BuscarEventoIdHelper(inscricaoPayLoad.eventoId)

    const { usuario } = await CriarUsuarioInscricaoHelper({
      nome: usuarioData.nome,
      cpf: usuarioData.cpf,
      email: usuarioData.email,
      telefone: usuarioData.telefone,
      data_nascimento: usuarioData.dataNascimento,
      senha: undefined,
      avatar: undefined,
      churchId: evento!.churchId,
    })

    let inscricao = await Inscricao.query()
      .where('evento_id', evento.id)
      .andWhere('responsavel_id', usuario.id)
      .first()

    if (!inscricao) {
      inscricao = await Inscricao.create({
        eventoId: evento.id,
        responsavelId: usuario.id,
        situacaoId: Constants.Situacao.Pendente,
        inscricaoJson: inscricaoJSON,
      })
    }

    inscricao.inscricaoJson =
      typeof inscricao.inscricaoJson === 'string'
        ? JSON.parse(inscricao.inscricaoJson)
        : inscricao.inscricaoJson

    return { inscricao }
  } catch (error) {
    throw error
  }
}
