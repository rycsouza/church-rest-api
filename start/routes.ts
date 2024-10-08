/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ArquivosController = () => import('#controllers/arquivos_controller')
const FormulariosController = () => import('#controllers/formularios_controller')
const VendasController = () => import('#controllers/vendas_controller')
import router from '@adonisjs/core/services/router'

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
    router.post('/:tipo/:tag', [VendasController, 'store'])
  })
  .prefix('v1')
