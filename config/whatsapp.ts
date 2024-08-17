import qrcode from 'qrcode-terminal'
import WWebJS from 'whatsapp-web.js'

const { Client, LocalAuth, MessageMedia } = WWebJS

const client = new Client({
  authStrategy: new LocalAuth(),
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('WhatsApp Conectado!')
})

client.initialize()

export { client, MessageMedia }
