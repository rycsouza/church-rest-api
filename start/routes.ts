/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsuariosController = () => import('#controllers/usuarios_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/criar', [UsuariosController, 'store'])
    router.patch('/atualizar', [UsuariosController, 'update'])
    router.get('/perfil', [UsuariosController, 'show'])
  })
  .prefix('usuario')
