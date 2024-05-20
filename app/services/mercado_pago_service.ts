import MercadoPagoPayment from '#config/mercadopago'
/* eslint-disable unicorn/no-await-expression-member */
import Evento from '#models/evento'
import Inscricao from '#models/inscricao'
import Usuario from '#models/usuario'

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

      return { url: payment.point_of_interaction?.transaction_data?.ticket_url }
    } catch (error) {
      throw error
    }
  }

  static async gerarPagamentoCard(data: any) {
    const { evento, usuario, cartao }: { evento: Evento; usuario: Usuario; cartao: string | JSON } =
      data
    try {
      const cartaoJSON = typeof cartao === 'string' ? JSON.parse(cartao) : cartao

      if (!cartaoJSON.parcelamento) cartaoJSON.parcelamento = 1
      if (cartaoJSON.parcelamento > evento.parcelamento)
        throw new Error(`O valor do evento só pode ser parcelado em até ${evento.parcelamento}x`)

      const payment = await MercadoPagoPayment.create({
        body: {
          transaction_amount: Number(evento.valor),
          token: cartaoJSON.token,
          description: `Inscrição - ${evento.nome}`,
          installments: cartaoJSON.parcelamento,
          payment_method_id: cartaoJSON.flag,
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

      if (!payment)
        throw new Error(
          'Não foi possível gerar o pagamento com cartão! Tente novamente mais tarde.'
        )

      const inscricao = (
        await Inscricao.query().where('responsavel_id', usuario.id).andWhere('evento_id', evento.id)
      )[0]

      inscricao.mercado_pago_id = payment.id
      await inscricao.save()

      return payment
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
