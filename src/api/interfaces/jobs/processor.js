import { http } from 'api/http'

const url = 'jobs/processor/'

export const processor = {
  get: (accessionCode) => {
    const path = `${url}${accessionCode}/`

    return http.get(path)
  },
  list: (params) => http.get(url, params)
}
