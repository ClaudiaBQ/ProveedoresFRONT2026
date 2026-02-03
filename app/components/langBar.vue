<template>
    <div class="text-right mr-2">
      <v-btn-toggle
      border
      divided
    >
        <v-btn  v-for="item in list" size="small" @click="getTraductions(item)">{{ item.code.toUpperCase() }}</v-btn>
    </v-btn-toggle>
    </div> 
</template>

<script setup>
import {useTraductions } from '~/composables/services/traductions.js'
import { useLanguageStore } from '~/stores/language'
const { all_lang } = useTraductions()
const list = ref([])
const loading = ref(true)


onMounted(async () => {
  try {
    const res = await all_lang()
    console.log(res)
    list.value = res?.response || []
    getTraductions(list.value[0])
  } catch (e) {
    console.error('Error cargando módulos:', e)
  } finally {
    loading.value = false
  }
})

const getTraductions = (lang) => {
  const languageStore = useLanguageStore()
  languageStore.setLanguage(lang)
}
</script>

<style scoped>
.text-white-opacity {
  opacity: 0.85;
}
.leading-none {
  line-height: 1.1;
}
</style>
