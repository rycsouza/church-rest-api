import fs from 'node:fs'
import edge from 'edge.js'
import puppeteer from 'puppeteer'

interface GenerateImageInterface {
  data: { [key: string]: string }
  midiaFolder: string
  elementoHTML: string
}

export default async ({ data, midiaFolder, elementoHTML }: GenerateImageInterface) => {
  try {
    const html = await edge.render(`../../resources/views/mails/${midiaFolder}`, data)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setContent(html)

    await page.waitForSelector(elementoHTML)

    const element = await page.$(elementoHTML)
    const boundingBox = await element?.boundingBox()

    const caminhoPasta = `./app/tmp/images/${midiaFolder}`
    const caminhoImagem = `${caminhoPasta}/${data!.id}.png`

    if (boundingBox) {
      if (!fs.existsSync(caminhoPasta)) {
        fs.mkdirSync(caminhoPasta, { recursive: true })
      }

      await page.screenshot({
        path: caminhoImagem,
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height,
        },
      })
    }

    await browser.close()

    return { pathMediaFile: caminhoImagem }
  } catch (error) {
    console.log(error)
    return false
  }
}
