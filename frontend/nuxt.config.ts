// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  css: ['~/assets/css/dashboard.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3333'
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/logo.png' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
