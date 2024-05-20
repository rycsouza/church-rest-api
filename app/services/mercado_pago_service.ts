/* eslint-disable unicorn/no-await-expression-member */
import Evento from '#models/evento'
import MercadoPagoPayment from '#config/mercadopago'
import Usuario from '#models/usuario'
import Inscricao from '#models/inscricao'

export default class MercadoPagoService {
  static async verificarStatusPagamento(paymentId: number) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    return (await MercadoPagoPayment.get({ id: paymentId })).status
  }

  static async gerarPagamentoPix(data: any) {
    const { evento, usuario }: { evento: Evento; usuario: Usuario } = data
    try {
      const payment = await MercadoPagoPayment.create({
        body: {
          transaction_amount: Number(evento.valor),
          token: process.env.MERCADOPAGO_ACCESSTOKEN,
          description: `Inscrição - ${evento.nome}`,
          installments: 1,
          payment_method_id: 'pix',
          payer: {
            first_name: usuario.nome,
            email: usuario.email,
            phone: {
              area_code: usuario.telefone.substring(0, 2),
              number: usuario.telefone.substring(2),
            },
            identification: {
              type: 'CPF',
              number: usuario.cpf,
            },
          },
        },
      })

      if (!payment) throw new Error('Não foi possível gerar o pix! Tente novamente mais tarde.')

      const inscricao = (
        await Inscricao.query().where('responsavel_id', usuario.id).andWhere('evento_id', evento.id)
      )[0]

      inscricao.mercado_pago_id = payment.id
      await inscricao.save()

      return payment.point_of_interaction?.transaction_data?.ticket_url
    } catch (error) {
      throw error
    }
  }
}
