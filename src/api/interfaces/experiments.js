import http from 'api/http'

const url = 'experiments/'

export default {
  get: (accessionCode) => {
    const path = `${url}${accessionCode}/`

    return http.get(path)
  }
}
