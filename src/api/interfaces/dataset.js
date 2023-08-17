import http from 'api/http'

const url = 'dataset/'

export default {
  get: (id, params) => http.get(`${url}${id}/`, params),
  update: (id, params, details) =>
    http.put(`${url}${id}/${details ? '?details=true' : ''}`, params)
}
