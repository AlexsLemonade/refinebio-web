import { http } from 'api/http'

const url = 'computed_files/'

export const computedFiles = {
  get: (sampleId) => {
    const param = { samples: sampleId }

    return http.get(url, param)
  },
  list: (params) => http.get(url, params)
}
