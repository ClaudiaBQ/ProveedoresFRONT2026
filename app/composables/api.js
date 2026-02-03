import { ofetch } from 'ofetch'

let _client = null

function getClient() {
  const rc = useRuntimeConfig()
  const baseURL = rc.public.apiBase
  const apiToken = rc.public.apiToken

  if (!_client) {
    _client = ofetch.create({
      baseURL,
      onRequest({ options }) {
        const headers = new Headers(options.headers || {})
        headers.set('Accept', 'application/json')
        if (apiToken) {
          headers.set('access_token', apiToken)
        }
        options.headers = headers
      },
      onResponseError({ response }) {
        console.error('API ERROR', response.status, response._data)
      },
    })
  }

  return _client
}

export const useApi = (path, options = {}) => {
  const client = getClient()
  return client(path, options)
}
