// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/axios'],
  runtimeConfig: {
    public: {
      backendURL: process.env.BACKEND_API,
      appURL: process.env.APP_URL
    }
  },
  devtools: { enabled: true }
})
