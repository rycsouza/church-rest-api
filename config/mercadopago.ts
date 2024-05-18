import { MercadoPagoConfig, Payment } from 'mercadopago'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESSTOKEN

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN!,
})

const MercadoPagoPayment = new Payment(client)

export default MercadoPagoPayment
