import ResourceConfig from './resources_config.js'
import models from '#models/index'
import { LucidResource } from '@adminjs/adonis'

let resources: any[] | undefined = []

models.forEach((model) => {
  resources.push({
    resource: new LucidResource(model, 'mysql'),
    options: {
      id: ResourceConfig[model.name].id,
      titleProperty: ResourceConfig[model.name].titleProperty,
      navigation: ResourceConfig[model.name].Navigation,
      sort: ResourceConfig[model.name].Sort,
      properties: ResourceConfig[model.name].Properties,
      actions: ResourceConfig[model.name].Actions,
    },
  })
})

export default resources
