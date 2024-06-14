import { submitSlackDataRequest } from 'data-requests/slack'

export default async (req, res) => {
  // requestValues should include form values, query/accessionCode, and the request type ('experiment' or 'search')
  const {
    body: { requestValues },
    method
  } = req

  switch (method) {
    case 'POST': {
      const response = { status: 204, message: '' }
      // TEMP
      const githubSuccess = false
      const hubspotSuccess = false

      // requests to Slack only if requests to GitHub and/or HubSpot fail
      if (!githubSuccess || !hubspotSuccess) {
        let failedRequest
        if (!githubSuccess && !hubspotSuccess) {
          failedRequest = 'GitHub and HubSpot'
        } else if (!githubSuccess) {
          failedRequest = 'GitHub'
        } else {
          failedRequest = 'HubSpot'
        }

        const slackSuccess = await submitSlackDataRequest(
          requestValues,
          requestValues.request_type,
          failedRequest
        )

        if (slackSuccess) {
          response.status = 206
          response.message = `${failedRequest} failed, sent to Slack instead`
        }
        // sets Slack status to 500, as it won't have all of the data from both HubSpot and GitHub even if they succeed
        else {
          response.status = 500
          response.message = `${failedRequest} failed, sent to Slack but that also failed`
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
