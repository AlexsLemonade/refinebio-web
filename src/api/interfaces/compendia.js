import http from 'api/http'

const url = 'compendia/'

export default {
  download: (id, token) => {
    const headers = { 'API-KEY': token }
    const path = `${url}${id}`

    return http.get(path, null, headers)
  },
  get: (params, token) => {
    const headers = token ? { 'API-KEY': token } : null

    return http.get(url, params, headers)
  }
}
