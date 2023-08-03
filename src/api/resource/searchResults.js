// TEMPORARY for testing
import http from '../http'

const url = 'search/'

export const searchResults = {
  get: (params) => http.get(url, params)
}
