<template>
  <Start></Start>
</template>
<script>
import { useT } from '~/composables/useT'

export default {
  name: 'Form',
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