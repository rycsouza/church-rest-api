import MercadoPagoConfig from '#config/mercadopago'

export default class MercadoPagoService {
  static async verificarStatusPagamento(paymentId: number) {
    // eslint-disable-next-line unicorn/no-await-expression-member
    return (await MercadoPagoConfig.payment.get({ id: paymentId })).status
  }

  static async checkout(data: any) {
    const { evento, usuario, pId }: any = data

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
            // email: usuario.email,
            // phone: {
            //   area_code: usuario.telefone.substring(0, 2),
            //   number: usuario.telefone.substring(2, 11),
            // },
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
            success: process.env.MERCADOPAGO_REDIRECT_SUCCESS,
            failure: process.env.MERCADOPAGO_REDIRECT_FAIL,
            pending: process.env.MERCADOPAGO_REDIRECT_PENDING,
          },
          auto_return: 'approved',
        },
      })

      return { url: preference?.init_point, id: preference?.id }
    } catch (error) {
      console.error('Erro de Pagamento: ', error)
      return error
    }
  }
}
