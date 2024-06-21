import MercadoPagoConfig from '#config/mercadopago'
/* eslint-disable unicorn/no-await-expression-member */
import Evento from '#models/evento'
import Usuario from '#models/usuario'

export default class MercadoPagoService {
  static async verificarStatusPagamento(paymentId: number) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    return (await MercadoPagoConfig.payment.get({ id: paymentId })).status
  }

  static async checkout(data: any) {
    const { evento, usuario, pId }: { evento: Evento; usuario: Usuario; pId: string } = data

    try {
      if (pId) {
        const preferenceExist = await MercadoPagoConfig.preference.get({ preferenceId: pId })
        if (preferenceExist) return { url: preferenceExist?.init_point, id: preferenceExist?.id }
      }

      const preference = await MercadoPagoConfig.preference.create({
        body: {
          items: [
            {
              id: evento.id.toString(),
              title: evento.nome,
              quantity: 1,
              currency_id: 'BRL',
              unit_price: Number(evento.valor),
            },
          ],
          payer: {
            name: usuario.nome,
            email: usuario.email,
            phone: {
              area_code: usuario.telefone.substring(0, 2),
              number: usuario.telefone.substring(2, 11),
            },
            identification: {
              number: usuario.cpf,
              type: 'CPF',
            },
          },
          payment_methods: {
            excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
            installments: Number(evento.parcelamento),
          },
          back_urls: {
            success: 'http://localhost:3000/',
            failure: 'http://localhost:3000/',
            pending: 'http://localhost:3000/',
          },
          auto_return: 'approved',
        },
      })

      return { url: preference?.init_point, id: preference?.id }
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
