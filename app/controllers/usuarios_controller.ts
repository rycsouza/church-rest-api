import { createUsuarioValidator, updateUsuarioValidator } from '#validators/usuario'

import type { HttpContext } from '@adonisjs/core/http'
import { CriarUsuarioHelper, AtualizarUsuarioHelper } from '../helpers/usuario/index.js'
import MailService from '#services/mail_service'

export default class UsuarioController {
  async store({ request }: HttpContext) {
    return await MailService.send({
      sender: 'Brasa Viva - Teste',
      receiver: 'ugamerx92@gmail.com',
      subject: 'Comprovante de Teste',
      htmlPath: '../../resources/views/comprovante_inscricao.edge',
    })
    const usuarioPayload = await request.validateUsing(createUsuarioValidator)

    return await CriarUsuarioHelper(usuarioPayload)
  }

  async update({ request, auth }: HttpContext) {
    const updatePayload = await request.validateUsing(updateUsuarioValidator)
    const usuario = auth.user!

    return await AtualizarUsuarioHelper(usuario, updatePayload)
  }

  async show({ auth }: HttpContext) {
    return { usuario: auth.user! }
  }
}
