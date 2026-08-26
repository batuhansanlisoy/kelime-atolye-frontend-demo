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