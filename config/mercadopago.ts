import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESSTOKEN

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN!,
})

const MercadoPagoPayment = { preference: new Preference(client), payment: new Payment(client) }

export default MercadoPagoPayment
