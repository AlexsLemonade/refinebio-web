import http from 'helpers/http'

const url = 'computed_files/'

export default {
  get: (sampleId) => {
    const param = { samples: sampleId }

    return http.get(url, param)
  },
  list: (params) => http.get(url, params)
}
