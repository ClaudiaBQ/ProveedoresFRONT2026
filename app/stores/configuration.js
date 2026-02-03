import { defineStore } from 'pinia'
import { useConfigurations } from '~/composables/services/configurations'

export const useConfStore = defineStore('config', () => {
  const c = ref(null)               
  const configurations = ref({})          
  const loading = ref(false)

  const { get_all_public } = useConfigurations()

  const init = async () => {
   
    loading.value = true
    try {
      const data  = await get_all_public()
      
      configurations.value = data?.response
      console.log(configurations.value)
    } finally {
      loading.value = false
    }
  }

  const load = (code) => {
  const temp = configurations.value[code] || []

  if (temp.length > 0) {
    console.log(
      '--------------------',
      temp[0]?.value?.split(';').map(s => s.trim().toUpperCase())
    )

    return temp[0]?.value?.split(';').map(s => s.trim().toUpperCase())
  }

  return null
}


  return {
   init,
   load
  }
})