import http from 'helpers/http'

const endpoint = 'compendia'

export default {
  download: (id, token) => {
    const headers = { 'API-KEY': token }
    const path = `${endpoint}/${id}`

    return http.get(path, null, headers)
  },
  get: (params, token) => {
    const headers = token ? { 'API-KEY': token } : null

    return http.get(`${endpoint}/`, params, headers)
  }
}
