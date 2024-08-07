// Github data request
import fetch from 'isomorphic-unfetch'
import { requests } from 'config'
// (resources)
// https://docs.github.com/en/rest/issues/issues#create-an-issue
// https://github.com/settings/tokens
const createIssue = async (token, params) => {
  // API endpoint for the repo to file an issue
  const endpoint = process.env.NEXT_PUBLIC_GITHUB_ENDPOINT_TEST
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    return true
  } catch (error) {
    console.error('Error requesting to Github API:', error)
    return false
  }
}

export const submitGithubDataRequest = async (
  token,
  requestValues,
  requestType
) => {
  const { accession_codes: accessionCodes, query } = requestValues
  const requestUrl = requests.data_request[requestType]
  const requestBody = {
    experiment: `### Context\r\n\r\nA user requested [${accessionCodes}](${requestUrl}${accessionCodes})`,
    search: `### Context\r\n\r\nA user requested ${accessionCodes} for the search term ["${query}"](${requestUrl}${query})`
  }

  return createIssue(token, {
    title: `Dataset Request ${accessionCodes}`,
    body: `${requestBody[requestType]}
          \r\n\r\n### Problem or idea\r\n\r\n(Add description of experiment/problem here)
          \r\n\r\n### Solution or next step\r\n\r\n(Add solution/next step here)`,
    labels: ['dataset request']
  })
}
