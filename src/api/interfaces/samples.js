import { http } from 'api/http'

const url = 'samples/'

export const samples = {
  get: (accessionCode) => {
    const path = `${url}${accessionCode}/`

    return http.get(path)
  },
  list: (params) => http.get(url, params)
}