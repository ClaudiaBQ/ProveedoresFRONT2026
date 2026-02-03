<template>
    <v-toolbar  class="bg-sampol">
          <a alt="logo" href="https://www.sampol.com/" target="_blank">
          <img src="@/assets/logo.png" class="logoB">
        </a>
        <v-toolbar-title class="title">{{ t('supplierRequest') }}</v-toolbar-title>              
       <LangBar></LangBar>
    </v-toolbar>
</template> 


<script>
import { useT } from '~/composables/useT'

export default {
  name: 'TopBar',
  components: {},
  props: [],
  data () {   
    return {  
    }
  },
  props: {   
  },
  methods: {     
  },
  computed: {
    t() {
      return useT().t
    },
  },
  mounted () {
  }
}
</script>