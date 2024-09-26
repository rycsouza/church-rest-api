//@ts-nocheck
import Formulario from '#models/formulario'

import type { HttpContext } from '@adonisjs/core/http'

export default class FormulariosController {
  async getByTag({ request, response }: HttpContext) {
    try {
      const { tipo, tag } = request.params()

      const formulario = await Formulario.findBy({ tipo, tag })

      if (!formulario) throw new Error('Não foi possível encontrar o formulário!')

      await formulario.load('empresa')

      return chooseReturn({ formulario })
    } catch (error) {
      response.status(400).send({ messagem: 'Formulário não Encontrado!', error })
    }
  }
}

function chooseReturn({ formulario }: { formulario: Formulario }) {
  const retornos = {
    evento: () => {
      const formularioConfigJson = JSON.parse(formulario.configJson)

      return {
        tipo: formulario.tipo,
        dados: {
          empresa: formulario.empresa.nome,
          logo: JSON.parse(formulario.empresa.configJson).logo,
          evento: formularioConfigJson.nome,
          imagem: formularioConfigJson.imagem,
          data: formularioConfigJson.data,
          hora: formularioConfigJson.horario,
          cidade: formularioConfigJson.cidade,
          local: formularioConfigJson.local,
          grupo: formularioConfigJson.grupo,
          idadeMínima: formularioConfigJson.idadeMinima,
          valor: formularioConfigJson.valor,
          parcelamento: formularioConfigJson.parcelamento,
        },
        formulario: formularioConfigJson.formulario,
        condicaoMostrarCamposExtras: formularioConfigJson.condicaoMostrarCamposExtras,
        goToCheckout: JSON.parse(formulario.empresa.configJson).checkout,
      }
    },
    cardapio: () => {
      return true
    },
    agenda: () => {
      return true
    },
    checkout: () => {
      return true
    },
  }

  try {
    return retornos[formulario.tipo]()
  } catch {
    return null
  }
}
