import { useApi } from '~/composables/api'

export const useConfigurations = () => {


  const get_all_public = () => {
    return useApi('/configuration/allPublic')
  }
 
  return {
    get_all_public
  }
}