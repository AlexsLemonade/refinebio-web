import http from 'api/http'

const url = 'dataset/'

export default {
  create: (params) => http.post(url, params),
  get: (id, params, headers) => http.get(`${url}${id}/`, params, headers),
  update: (id, params, details) =>
    http.put(`${url}${id}/${details ? '?details=true' : ''}`, params)
}
