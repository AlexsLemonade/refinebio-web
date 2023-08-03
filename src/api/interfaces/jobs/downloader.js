import http from 'api/http'

const url = 'jobs/downloader/'

export default {
  get: (accessionCode) => {
    const param = {
      sample_accession_code: accessionCode
    }

    return http.get(url, param)
  },
  list: (params) => http.get(url, params)
}
