import http from 'helpers/http'

const endpoint = 'search'

export default {
  get: (params) => http.get(`${endpoint}/`, params)
}
