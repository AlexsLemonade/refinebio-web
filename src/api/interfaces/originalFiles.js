import { http } from 'api/http'

const url = 'original_files/'
export const originalFiles = {
  get: (sampleId) => {
    const param = { samples: sampleId }

    return http.get(url, param)
  },
  list: (params) => http.get(url, params)
}
