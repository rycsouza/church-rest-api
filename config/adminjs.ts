import authProvider from '../app/admin/auth.js'
import { componentLoader, Components } from '../app/admin/component_loader.js'
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
    dashboard: {
      component: Components.DASHBOARD,
    },
    componentLoader,
    resources: resources,
    locale: {
      availableLanguages: ['ptBR'],
      language: 'ptBR',
      translations: Constants.Traducao,
    },
    branding: {
      companyName: 'Dynamic Tech',
      logo: 'https://firebasestorage.googleapis.com/v0/b/church-project-20605.appspot.com/o/Dynamic%20(3)%201.png?alt=media&token=18eda43c-fe20-40f2-81d0-9fc3a6c6d402',
      favicon:
        'https://firebasestorage.googleapis.com/v0/b/church-project-20605.appspot.com/o/Dynamic%20(1).png?alt=media&token=2b05377d-0d72-4c7f-9229-e1728bce13ca',
      theme: {
        colors: {
          primary100: '#8906E6',
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
