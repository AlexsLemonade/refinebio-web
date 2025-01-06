import http from 'helpers/http'

const endpoint = 'dataset'

// By detault, considering the futhre backend API revision, pass the query string details=true (no longer optional) for fetching the dataset
// (ref) https://github.com/AlexsLemonade/refinebio-web/issues/178#issuecomment-1719684364
// 'details': https://github.com/AlexsLemonade/refinebio-frontend/pull/485

export default {
  create: (body) => http.post(`${endpoint}/`, body),
  get: (id, headers) =>
    http.get(`${endpoint}/${id}/`, { details: true }, headers),
  update: (id, body, headers) =>
    http.put(`${endpoint}/${id}/?details=true`, body, headers)
}
