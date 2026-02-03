import { useApi } from '~/composables/api'

export const useTraductions = () => {

  const create = (requester, body) => {
    return useApi('/traductions/create_lang', {
      method: 'POST',
      query: { requester },
      body
    })
  }

  const all_lang = () => {
    return useApi('/traductions/all_lang')
  }

  const traductions_per_lang = (id) => {
    return useApi(`/traductions/all_traductions_related?id=${id}`)
  }

  return {
    create,
    all_lang,
    traductions_per_lang
  }
}
