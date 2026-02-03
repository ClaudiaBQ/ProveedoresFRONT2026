import { defineStore } from 'pinia'
import { useTraductions } from '~/composables/services/traductions'

export const useLanguageStore = defineStore('language', () => {
  const lang = ref(null)               
  const traductions = ref({}) 
  const fallbackTraductions = ref({})           
  const loading = ref(false)

  const { traductions_per_lang } = useTraductions()

  const setLanguage = async (language) => {
   
    lang.value = language
    loading.value = true

    try {
      const data  = await traductions_per_lang(language.id)
      
      traductions.value = data?.response.reduce((acc, item) => {
        acc[item.code] = item.value
        return acc
      }, {})

      const fallbackData = await traductions_per_lang(4)
      fallbackTraductions.value = fallbackData?.response.reduce((acc, item) => {
        acc[item.code] = item.value
        return acc
      }, {})
    } finally {
      loading.value = false
    }
  }

  const t = (code) => {
    return traductions.value[code] || fallbackTraductions.value[code] || code
  }

  return {
    lang,
    traductions,
    loading,
    setLanguage,
    t
  }
})
