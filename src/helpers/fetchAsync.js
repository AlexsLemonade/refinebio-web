import fetch from 'isomorphic-unfetch'

const host = process.env.API_HOST
const apiVersion = process.env.API_VERSION

export default async (url, params = false) => {
  const apiUrl = url.startsWith('http') ? url : `${host}/${apiVersion}/${url}`
  let response
  let result

  try {
    response = await (params ? fetch(apiUrl, params) : fetch(apiUrl))
  } catch (e) {
    return {
      ok: false,
      message: `Network error when fetching ${apiUrl}`,
      statusCode: 504,
      error: e
    }
  }

  // checks for backend version to ensure it hasn't changed since the last deploy
  if (response.headers) {
    const sourceRevision = response.headers.get('x-source-revision')

    if (
      !!sourceRevision &&
      !!apiVersion &&
      !sourceRevision.includes(apiVersion)
    ) {
      return {
        ok: false,
        message: 'Refinebio API version mismatch',
        statusCode: 404
      }
    }
  }

  // checks for parsing error (temporarily returns 500)
  try {
    result = await response.json()
  } catch (e) {
    return {
      message: 'Error occurred while parsing the data',
      statusCode: 500
    }
  }

  // checks for an exception (only rejected when there is a network problem)
  if (!response.ok) {
    return {
      ok: false,
      message: `${response.status} error occurred`,
      statusCode: response.status,
      result
    }
  }

  return {
    ...result,
    ok: response.ok,
    statusCode: response.status
  }
}
