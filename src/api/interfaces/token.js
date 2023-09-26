import http from 'helpers/http'

const url = 'token/'

export default {
  create: () => {
    return http.post(url)
  },
  get: (id) => {
    const path = `${url}${id}`

    return http.get(path)
  },
  update: (id, params) => {
    const path = `${url}${id}`

    return http.put(path, params || { is_activated: true })
  }
}
