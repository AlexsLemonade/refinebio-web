import http from 'helpers/http'

const endpoint = 'samples'

export default {
  get: (params) => http.get(`${endpoint}/`, params)
}
