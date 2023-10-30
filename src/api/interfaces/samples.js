import http from 'helpers/http'

const url = 'samples/'

export default {
  get: (params) => http.get(url, params)
}
