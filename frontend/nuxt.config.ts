// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  css: ['~/assets/css/dashboard.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3333'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
