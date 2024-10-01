import Constants from '#models/constants'

export default class PainelsController {
  async getResources() {
    const resources = (await import('../utils/resouces_instance.js')).default

    resources.forEach((resource) => {
      //@ts-ignore
      resource.code = Constants.Permissoes[resource.options.id].list
    })

    return { resources }
  }
}
