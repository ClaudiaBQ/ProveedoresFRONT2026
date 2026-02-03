import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { VDateInput } from 'vuetify/labs/VDateInput'



export default defineNuxtPlugin(async (nuxtApp) => { 
  const vuetify = createVuetify({
    components: {
     VDateInput,
    },
    directives,
    ssr: true,
    theme: {
      defaultTheme: 'customLight',
      themes: {
        customLight: {
          dark: false,
          colors: {
            primary: '#005CB9',
            error : 'rgb(243, 30, 30)'
          },
        },
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})