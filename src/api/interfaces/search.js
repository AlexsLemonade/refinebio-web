import http from 'helpers/http'

const url = 'search/'

export default {
  get: (params) => http.get(url, params)
}
