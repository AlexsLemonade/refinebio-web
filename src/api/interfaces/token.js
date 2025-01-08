import http from 'helpers/http'

const endpoint = 'token'

export default {
  create: (body) => http.post(`${endpoint}/`, body),
  get: (id) => http.get(`${endpoint}/${id}/`),
  update: (id, body) => http.put(`${endpoint}/${id}/`, body)
}
