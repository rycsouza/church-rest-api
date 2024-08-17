import env from '#start/env'
import qrcode from 'qrcode-terminal'
import WWebJS from 'whatsapp-web.js'

const { Client, LocalAuth, MessageMedia } = WWebJS

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: env.get('BROWSER_PATH'),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('WhatsApp Conectado!')
})

client.initialize()

export { client, MessageMedia }
