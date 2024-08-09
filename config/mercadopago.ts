import Credencial from '#models/credencial'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import env from '#start/env'

const MPConfig = async ({ churchId }: { churchId: number }) => {
  const tag = env.get('NODE_ENV') === 'development' ? 'mercadopago-hom' : 'mercadopago-prod'

  const credencial = await Credencial.query()
    .where({ gateway: 'mercadopago' })
    .andWhere({ tag })
    .andWhere({ church_id: churchId })

  const ACCESS_TOKEN = JSON.parse(credencial[0].credencialJson).ACCESS_TOKEN

  const client = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
  })

  return { preference: new Preference(client), payment: new Payment(client) }
}

export default MPConfig
