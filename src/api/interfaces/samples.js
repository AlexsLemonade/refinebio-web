import http from 'api/http'

const url = 'samples/'

export default {
  get: (params) => http.get(url, params)
}
