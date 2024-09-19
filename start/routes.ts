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
const MessagesController = () => import('#controllers/messages_controller')
const ArquivosController = () => import('#controllers/arquivos_controller')
const FormulariosController = () => import('#controllers/formularios_controller')
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
    router.get('/', [EventosController, 'index'])
    //router.get('/:id', [EventosController, 'show'])
    //router.get('/forms/:id', [EventosController, 'showForms'])
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
    router.patch('/checkin/:id', [InscricaosController, 'checkIn'])
    router.get('/', [InscricaosController, 'index'])
    router.get('/:cpf', [InscricaosController, 'buscarPorCPF'])
    router.get('/show/:id', [InscricaosController, 'show'])
    router.delete('/deletar', [InscricaosController, 'delete'])
  })
  .prefix('inscricao')

router
  .group(() => {
    router.post('/verify', [PaymentsController, 'handle'])
  })
  .prefix('payment')

router.get('/', ({ response }) => response.redirect('/admin'))

router
  .group(() => {
    router.post('/sendText', [MessagesController, 'sendText'])
  })
  .prefix('message')

router
  .group(() => {
    router
      .group(() => {
        router.post('/upload', [ArquivosController, 'upload'])
      })
      .prefix('arquivo')
  })
  .prefix('painel')

router
  .group(() => {
    router.get('/:tipo/:tag', [FormulariosController, 'getByTag'])
  })
  .prefix('v1')
