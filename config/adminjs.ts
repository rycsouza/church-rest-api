import authProvider from '../app/admin/auth.js'
import componentLoader from '../app/admin/component_loader.js'
import resources from '../app/utils/resouces_instance.js'
import { AdminJSProviderConfig } from '@adminjs/adonis'
import { dark, light, noSidebar } from '@adminjs/themes'
import Constants from '#models/constants'

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    defaultTheme: light.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    componentLoader,
    resources: resources,
    pages: {},
    locale: {
      availableLanguages: ['en'],
      language: 'en',
      translations: Constants.Traducao,
    },
    branding: {
      companyName: 'BlessedBoard',
      logo: 'https://emoji.slack-edge.com/TJ9J9HG8Z/geovannabolsonaro2/aca8b53bda1e5433.jpg',
      favicon: 'https://emoji.slack-edge.com/TJ9J9HG8Z/geovannabolsonaro2/aca8b53bda1e5433.jpg',
      theme: {
        colors: {
          primary100: '#009739',
          primary80: '#FEDD00',
          primary60: ' #012169',
          primary40: '#FFFFFF',
        },
      },
      withMadeWithLove: false,
    },
    settings: {
      defaultPerPage: 10,
    },
  },
  auth: {
    enabled: true,
    provider: authProvider,
    middlewares: [],
  },
  middlewares: [],
}

export default adminjsConfig
