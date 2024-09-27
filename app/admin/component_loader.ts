import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const bundle = (name: string, path: string) => {
  return componentLoader.add(name, `./components/${path}`)
}

const Components = {
  UPLOAD: bundle('UPLOAD', 'upload'),
  DASHBOARD: bundle('DASHBOARD', 'dashboard'),
}

export { componentLoader, Components }
