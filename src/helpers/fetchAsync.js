// TEMPORARY for testing
import fetch from 'isomorphic-unfetch'

// Store the last api version detected - used to detect updates to the api
// while the app is running.
const host = 'https://api.refine.bio'
const apiVersion = 'v1'

// Returns the fulfilled promise using isomorphic-unfetc with async/await
export const fetchAsync = async (url, params = false) => {
  const apiUrl = url.startsWith('http') ? url : `${host}/${apiVersion}/${url}`

  let response

  try {
    response = await (params ? fetch(apiUrl, params) : fetch(apiUrl))
  } catch (e) {
    return {
      ok: false,
      message: `Network error when fetching ${apiUrl}`,
      status: e.status,
      error: e
    }
  }

  // check backend version to ensure it hasn't changed since the last deploy
  if (response.headers) {
    const sourceRevision = response.headers.get('x-source-revision')

    if (
      !!sourceRevision &&
      !!apiVersion &&
      !sourceRevision.includes(apiVersion)
    ) {
      throw new Error('Refinebio API version mismatch')
    }
  }

  let result

  try {
    result = await response.json()
  } catch (e) {
    result = { error: true, message: 'Error when fetching response' }
  }

  /**
   * You only get an exception (rejection) when there's a network problem.
   * When the server answers, you have to check whether it's good or not.
   */
  if (!response.ok) {
    return {
      ok: false,
      message: `${response.status} error`,
      status: response.status,
      result
    }
  }

  return result
}
