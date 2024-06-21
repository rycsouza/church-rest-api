import authProvider from '../app/admin/auth.js'
import componentLoader from '../app/admin/component_loader.js'
import resources from '../app/utils/resouces_instance.js'
import { AdminJSProviderConfig } from '@adminjs/adonis'
import { dark, light, noSidebar } from '@adminjs/themes'

const adminjsConfig: AdminJSProviderConfig = {
  adapter: {
    enabled: true,
  },
  adminjs: {
    defaultTheme: dark.id,
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
      translations: {
        en: {
          actions: {},
          messages: {},
          labels: {},
          buttons: {},
          properties: {},
          components: {},
          pages: {},
          ExampleResource: {
            actions: {},
            messages: {},
            labels: {},
            buttons: {},
            properties: {},
          },
        },
      },
    },
    branding: {
      companyName: 'Church Painel',
      theme: {},
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
