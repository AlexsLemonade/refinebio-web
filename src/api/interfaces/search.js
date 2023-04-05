import http from 'api/http'

const url = 'search/'

export default {
  get: (params) => http.get(url, params)
}
