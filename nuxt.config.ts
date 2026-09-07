// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devServer: {
      port: 7100
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      api: {
          scheme: process.env.API_SCHEME,
          base: process.env.API_BASE,
          port: process.env.API_PORT ?? undefined
      },
    }
  },
  i18n: {
    locales: [
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    langDir: 'locales/',
    defaultLocale: 'tr',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'tr'
    },
    customRoutes: 'config',
    pages: {
      'education': {
        tr: '/egitim',
        en: '/education'
      },
      'education/training': {
        tr: '/egitim/antrenman',
        en: '/education/training'
      },
      'dictionary': {
        tr: '/sozluk',
        en: '/dictionary'
      },
      'dictionary/[slug]': {
        tr: '/sozluk/[slug]',
        en: '/dictionary/[slug]'
      },
      'login': {
        tr: '/giris',
        en: '/login'
      },
      'register': {
        tr: '/kayit',
        en: '/register'
      },
      'reset_password': {
        tr: '/sifre-sifirla',
        en: '/reset-password'
      }
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700, 800],
    },
    display: 'swap',
    download: true,
  },
  css: ['~/assets/css/main.css'],
})