// Github data request
import fetch from 'isomorphic-unfetch'
import { links } from 'config'

// (resource) https://docs.github.com/en/rest/issues/issues#create-an-issue
const createIssue = async (params) => {
  // TEMP: usng local env var for env vars (temporaily the request will send to a test repo)
  // API endpoint for the repo to file an issue
  const githubUrl =
    process.env.GITHUB_EDNPOINT || process.env.NEXT_PUBLIC_GITHUB_ENDPOINT_TEST
  // (resource) Personal access token https://github.com/settings/tokens
  const githubToken =
    process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN_TEST

  try {
    await fetch(githubUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    return true
  } catch {
    return false
  }
}

export const submitGithubDataRequest = async (requestValues, requestType) => {
  const { accession_codes: accessionCodes, query } = requestValues
  const requestUrl = links.refinebio_data_request[requestType]
  const requestBody = {
    experiment: `### Context\r\n\r\nA user requested [${accessionCodes}](${requestUrl}${accessionCodes})`,
    search: `### Context\r\n\r\nA user requested ${accessionCodes} for the search term ["${query}"](${requestUrl}${query})`
  }

  return createIssue({
    title: `Dataset Request ${accessionCodes}`,
    body: `${requestBody[requestType]}
          \r\n\r\n### Problem or idea\r\n\r\n(Add description of experiment/problem here)
          \r\n\r\n### Solution or next step\r\n\r\n(Add solution/next step here)`,
    labels: ['dataset request']
  })
}
