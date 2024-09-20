// import MPConfig from '#config/mercadopago'

// export default class MercadoPagoService {
//   static async verificarStatusPagamento({
//     churchId,
//     paymentId,
//   }: {
//     churchId: number
//     paymentId: number
//   }) {
//     const MercadoPagoConfig = await MPConfig({ churchId })

//     return await MercadoPagoConfig.payment.get({ id: paymentId })
//   }

//   static async checkout(data: any) {
//     const { evento, usuario, pId, externalReference }: any = data
//     const MercadoPagoConfig = await MPConfig({ churchId: evento.churchId })

//     MercadoPagoConfig.credencial.REDIRECT_URL = MercadoPagoConfig.credencial.REDIRECT_URL.replace(
//       '{{eventoId}}',
//       evento.id
//     )
//     try {
//       if (pId) {
//         const preferenceExist = await MercadoPagoConfig.preference.get({
//           preferenceId: pId,
//         })
//         if (preferenceExist) return { url: preferenceExist?.init_point, id: preferenceExist?.id }
//       }

//       const preference = await MercadoPagoConfig.preference.create({
//         body: {
//           items: [
//             {
//               id: evento.id.toString(),
//               title: evento.nome,
//               quantity: 1,
//               currency_id: 'BRL',
//               unit_price: Number(evento.valor),
//             },
//           ],
//           payer: {
//             name: usuario.nome,
//             email: usuario.email,
//             phone: {
//               area_code: usuario.telefone.substring(0, 2),
//               number: usuario.telefone.substring(2, 11),
//             },
//             identification: {
//               number: usuario.cpf,
//               type: 'CPF',
//             },
//           },
//           payment_methods: {
//             excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
//             installments: Number(evento.parcelamento),
//           },
//           back_urls: {
//             success: MercadoPagoConfig.credencial.REDIRECT_URL,
//             failure: MercadoPagoConfig.credencial.REDIRECT_URL,
//             pending: MercadoPagoConfig.credencial.REDIRECT_URL,
//           },
//           auto_return: 'approved',
//           notification_url: MercadoPagoConfig.credencial.NOTIFICATION_URL,
//           external_reference: externalReference,
//         },
//       })

//       return { url: preference?.init_point, id: preference?.id }
//     } catch (error) {
//       console.error('Erro de Pagamento: ', error)
//       return error
//     }
//   }
// }
