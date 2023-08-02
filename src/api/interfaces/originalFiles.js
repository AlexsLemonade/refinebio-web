import http from 'api/http'

const url = 'original_files/'
export default {
  get: (sampleId) => {
    const param = { samples: sampleId }

    return http.get(url, param)
  },
  list: (params) => http.get(url, params)
}
