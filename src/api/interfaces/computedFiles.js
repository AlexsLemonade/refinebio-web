import { http } from 'api/http'

const url = 'computed_files/'

export const computedFiles = {
  get: (sampleId) => {
    const path = `${url}${sampleId}`

    return http.get(path)
  },
  list: (params) => http.get(url, params)
}
