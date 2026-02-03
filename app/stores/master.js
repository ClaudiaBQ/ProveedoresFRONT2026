// stores/master.js
import { defineStore } from 'pinia'
import { useMaster } from '~/composables/services/master'

export const useMasterStore = defineStore('masters', () => {
  const master = ref({})
  const loading = ref(false)
  const loaded = ref(false)

  const { get_all_masters } = useMaster()

  const getAllMasters = async () => {
    const data = await get_all_masters()
    console.log("kfsdfd", data)
    const response = data?.response  

    master.value = response.reduce((acc, item) => {
      acc[item.code] = item.rel_master_values ?? []
      return acc
    }, {})
}


  const m = (code) => master.value?.[code] || []

  const mFilter = (code, filter) =>
  Array.isArray(master.value?.[code])
    ? master.value[code].filter(f => f.principal_group == filter)
    : []

  return {
    master,
    loading,
    loaded,
    getAllMasters,
    m,
    mFilter
  }
})
