import http from 'helpers/http'

const url = 'token/'

export default {
  create: (body) => http.post(url, body),
  get: (id) => http.get(`${url}${id}/`),
  update: (id, body) => http.put(`${url}${id}`, body)
}
