import { http } from 'api/http'

const url = 'original_files/'
export const originalFiles = {
  get: (sampleId) => {
    const path = `${url}${sampleId}`

    return http.get(path)
  },
  list: (params) => http.get(url, params)
}
