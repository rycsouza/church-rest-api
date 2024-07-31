import Constants from '#models/constants'
import Inscricao from '#models/inscricao'
import MercadoPagoService from '#services/mercado_pago_service'

export default async ({ payment, response }: any) => {
  try {
    if (payment.type !== 'payment' || !payment.data || !payment.data.id)
      return response.status(400).send('Notificação Inválida!')

    const paymentId =
      typeof payment.data.id === 'string' ? Number(payment.data.id) : payment.data.id
    if (!paymentId) return response.status(400).send('Notificação Inválida!')

    const paymentStatus = await MercadoPagoService.verificarStatusPagamento(paymentId)

    if (!paymentStatus.status || paymentStatus.status !== 'approved')
      return response.status(400).send('Notificação Inválida!')

    const inscricao = await Inscricao.find(paymentStatus.external_reference)
    if (!inscricao) return response.status(400).send('Notificação Inválida!')

    inscricao.situacaoId = Constants.Situacao.Concluido
    await inscricao.save()

    return response.status(200).send(`Pagamento aprovado - Inscrição ${inscricao.id} concluída!`)
  } catch (error) {
    throw error
  }
}
