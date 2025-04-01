import fetch from 'isomorphic-unfetch'
// for the request data form for search results and experiments with non-downloadable samples
export default async (requestBody) => {
  const body = { ...requestBody, navigatorUserAgent: navigator.userAgent }
  const url = `/api/data-requests`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return response.json()
}
