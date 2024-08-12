import Church from '#models/church'
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

    //@ts-ignore
    const inscricaoJSON = JSON.parse(inscricao.inscricaoJson)?.camposInscricao

    if (!inscricaoJSON?.email)
      return response.status(200).send(`Pagamento aprovado - Inscrição ${inscricao.id} concluída!`)

    //@ts-ignore
    // eslint-disable-next-line unicorn/no-await-expression-member
    const churchConfig = JSON.parse((await Church.find(churchId))!.configJson)
    const { evento } = await BuscarEventoIdHelper(inscricao.eventoId)

    await MailService.send({
      sender: churchConfig.email,
      receiver: inscricaoJSON.email,
      subject: `Comprovante de Inscrição - ${evento.nome}`,
      htmlFile: 'comprovante_inscricao',
    })

    return response.status(200).send(`Pagamento aprovado - Inscrição ${inscricao.id} concluída!`)
  } catch (error) {
    throw error
  }
}
