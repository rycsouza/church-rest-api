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

router.get('/', ({ response }) => response.redirect('admin/login'))

router
  .group(() => {
    router
      .group(() => {
        router.post('/upload', [ArquivosController, 'upload'])
      })
      .prefix('arquivo')
    router.get('resources', async () => {
      const resources = (await import('../app/utils/resouces_instance.js')).default

      const resourcesIds: { id: string }[] | null = []
      resources?.forEach((resouce) => {
        resourcesIds.push({ id: resouce.options.id })
      })

      return { resources: resourcesIds?.sort((a, b) => a.id.localeCompare(b.id)) }
    })
  })
  .prefix('painel')

router
  .group(() => {
    router.get('/:tipo/:tag', [FormulariosController, 'getByTag'])
    router.post('/:tipo/:tag', [VendasController, 'store'])
  })
  .prefix('v1')
