import { useApi } from '~/composables/api'

export const useInvitation = () => {  

  const get_info_invitation = (id) => {
    return useApi(`/supplier/invitations/by_ID?code=${id}`)
  }
  return {
    get_info_invitation
  }
}
