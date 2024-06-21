import resourcesJson from './resources/index.js'

type ResourceConfigType = {
  [key: string]: {
    [key: string]:
      | {
          [key: string]:
            | string
            | { [key: string]: { [key: string]: boolean } | string | boolean | any }
        }
      | string
  }
}

const ResourcesConfig: ResourceConfigType = {}
resourcesJson.forEach((resource) => {
  ResourcesConfig[resource.modelName] = resource
})

export default ResourcesConfig
