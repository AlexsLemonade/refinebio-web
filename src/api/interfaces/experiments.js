import http from 'helpers/http'

const url = 'experiments/'

export default {
  get: (accessionCode) => {
    const path = `${url}${accessionCode}/`

    return http.get(path)
  }
}
