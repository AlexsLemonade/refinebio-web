import http from 'helpers/http'

const url = 'search/'

export const searchResults = {
  get: (params) => http.get(url, params)
}
