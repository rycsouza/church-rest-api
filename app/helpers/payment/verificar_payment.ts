//@ts-nocheck
import Constants from '#models/constants'
import Inscricao from '#models/inscricao'
import MailService from '#services/mail_service'
import MercadoPagoService from '#services/mercado_pago_service'
import { BuscarEventoIdHelper } from '../evento/index.js'

export default async ({ payment, response }: any) => {
  try {
    if (payment.type !== 'payment' || !payment.data || !payment.data.id)
      return response.status(400).send('Notificação Inválida!')

    const paymentId =
      typeof payment.data.id === 'string' ? Number(payment.data.id) : payment.data.id
    if (!paymentId) return response.status(400).send('Notificação Inválida!')

    const { churchId } = payment
    const paymentStatus = await MercadoPagoService.verificarStatusPagamento({
      churchId,
      paymentId,
    })

    if (!paymentStatus.status || paymentStatus.status !== 'approved')
      return response.status(400).send('Notificação Inválida!')

    const inscricao = await Inscricao.find(paymentStatus.external_reference)
    if (!inscricao) return response.status(400).send('Notificação Inválida!')

    inscricao.situacaoId = Constants.Situacao.Concluido
    await inscricao.save()

    const camposInscricao = JSON.parse(inscricao.inscricaoJson)?.camposInscricao

    if (!camposInscricao?.email) {
      const { evento } = await BuscarEventoIdHelper(inscricao.eventoId)

      await inscricao.load('situacao')
      await evento.load('church')

      await MailService.send({
        sender: { email: JSON.parse(evento.church.configJson)?.email, name: evento.church.nome },
        receiver: camposInscricao.email,
        subject: `${evento.nome} - Comprovante de Inscrição`,
        htmlFile: 'comprovante_inscricao',
        params: {
          nome: camposInscricao.nome,
          cpf: camposInscricao.cpf,
          evento: evento.nome,
          valor: evento.valor,
          situacao: inscricao.situacao.descricao,
          id: inscricao.id,
          igreja: evento.church.nome,
        },
      })
    }
    return response.status(200).send(`Pagamento aprovado - Inscrição ${inscricao.id} concluída!`)
  } catch (error) {
    throw error
  }
}
