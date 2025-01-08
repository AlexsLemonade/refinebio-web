import http from 'helpers/http'

const endpoint = 'experiments'

export default {
  get: (accessionCode) => {
    const path = `${endpoint}/${accessionCode}/`

    return http.get(path)
  }
}
