import { submitGithubDataRequest } from 'api/data-requests/github'
import { submitHubspotDataRequest } from 'api/data-requests/hubspot'
import { submitSlackDataRequest } from 'api/data-requests/slack'

export default async (req, res) => {
  // requestValues should include form values, query/accessionCode, and the request type ('experiment' or 'search')
  const {
    body: {
      requestValues,
      requestValues: { request_type: requestType }
    },
    method
  } = req

  switch (method) {
    case 'POST': {
      const response = { status: null }
      const githubSuccess = await submitGithubDataRequest(
        requestValues,
        requestType
      )
      const hubspotSuccess = await submitHubspotDataRequest(
        requestValues,
        requestType
      )

      // requests to Slack only if requests to GitHub and/or HubSpot fail
      if (!githubSuccess || !hubspotSuccess) {
        // sets failed requests' API name(s) to print
        const failedRequest =
          // eslint-disable-next-line no-nested-ternary
          !githubSuccess && !hubspotSuccess
            ? 'GitHub and HubSpot'
            : !githubSuccess
            ? 'GitHub'
            : 'HubSpot'

        const slackSuccess = await submitSlackDataRequest(
          requestValues,
          requestType,
          failedRequest
        )

        if (slackSuccess) {
          response.status = 206
          response.message = `${failedRequest} failed, sent to Slack instead`
        } else {
          response.status = 500
          response.message = `${failedRequest}, and Slack failed`
        }
      } else {
        response.status = 200
        response.message = 'GitHub and HubSpot succeeded'
      }

      res.status(response.status).json(response)
      break
    }
    default: {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }

  res.end()
}
