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
const ChurchesController = () => import('#controllers/churches_controller')
const InscricaosController = () => import('#controllers/inscricaos_controller')
const PaymentsController = () => import('#controllers/payments_controller')
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

router
  .group(() => {
    router.post('/criar', [ChurchesController, 'store'])
    router.patch('/atualizar', [ChurchesController, 'update'])
    router.get('/', [ChurchesController, 'index'])
    router.get('/:id', [ChurchesController, 'show'])
    router.delete('/deletar', [ChurchesController, 'delete'])
  })
  .prefix('igreja')

router
  .group(() => {
    router.post('/criar', [InscricaosController, 'store'])
    router.patch('/atualizar', [InscricaosController, 'update'])
    router.get('/', [InscricaosController, 'index'])
    router.get('/:id', [InscricaosController, 'show'])
    router.delete('/deletar', [InscricaosController, 'delete'])
  })
  .prefix('inscricao')

router
  .group(() => {
    router.post('/verify', [PaymentsController, 'handle'])
    router.post('/criar', [PaymentsController, 'store'])
  })
  .prefix('payment')
