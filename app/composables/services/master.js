import { useApi } from '~/composables/api'

export const useMaster = () => {

  const create_master = (requester, body) => {
    return useApi('/master/create_master', {
      method: 'POST',
      query: { requester },
      body
    })
  }

  const create_master_values = (requester, body) => {
    return useApi('/master/create_master_values', {
      method: 'POST',
      query: { requester },
      body
    })
  }
  const get_all_masters = () => {
    console.log("all", useApi('/master/all'))
    return useApi('/master/all')
  }

  const get_master_values = (id) => {
    return useApi(`/master/all_values?id=${id}`)
  }
  const get_all_values_code = (code) => {
    return useApi(`/master/all_values_code?code=${code}`)
  }

  return {
    create_master,
    create_master_values,
    get_all_masters,
    get_master_values,
    get_all_values_code
  }
}
