import http from 'api/http'

const url = 'search/'

export const searchResults = {
  get: (params) => http.get(url, params)
}
