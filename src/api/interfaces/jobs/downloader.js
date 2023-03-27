import { http } from 'api/http'

const url = 'jobs/downloader/'

export const downloader = {
  get: (accessionCode) => {
    const path = `${url}${accessionCode}/`

    return http.get(path)
  },
  list: (params) => http.get(url, params)
}
