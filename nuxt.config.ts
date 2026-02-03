import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://suppliers-sap-api-ceevdgezcycwgne8.francecentral-01.azurewebsites.net",
      apiToken: process.env.NUXT_PUBLIC_API_TOKEN || "SgcZHSOoT1kseAytihU0AbTiIstQU0F3MIPXssefMGUKSfIJVaqXe2O9Mr9mQDVU"
     
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
