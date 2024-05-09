/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsuariosController = () => import('#controllers/usuarios_controller')
const EventosController = () => import('#controllers/eventos_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/criar', [UsuariosController, 'store'])
    router.patch('/atualizar', [UsuariosController, 'update'])
    router.get('/perfil', [UsuariosController, 'show'])
  })
  .prefix('usuario')

router
  .group(() => {
    router.post('/criar', [EventosController, 'store'])
    router.get('/', [EventosController, 'index'])
    router.get('/:id', [EventosController, 'show'])
    router.get('/forms/:id', [EventosController, 'showForms'])
    router.patch('/atualizar/:id', [EventosController, 'update'])
    router.delete('/deletar/:id', [EventosController, 'delete'])
  })
  .prefix('evento')
