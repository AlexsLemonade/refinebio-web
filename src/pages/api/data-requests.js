import { submitGithubDataRequest } from 'data-requests/github'
import { submitHubspotDataRequest } from 'data-requests/hubspot'
import { submitSlackDataRequest } from 'data-requests/slack'

export default async (req, res) => {
  /* 
  Examples of Skack Post Data
  For 'experiment`:
  SRP152576 Experiment Requested // Hyperlinked heading (e.g., https://www.refine.bio/experiments/SRP152576)
  Pediatric Cancer Research   Primary Approach
  Yes                         Clinical Research
  Email
  user@example.com
  Additional Notes
  This is a user's message if any.
  
  Refine.bio | User's IP address | Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101
  Firefox/120.0 | This message was sent because the request to GitHub and HubSpot failed | Jun 14th, 2024

  For 'search`:
  Missing data for search term 'E-MEXP-3405' // Hyperlinked heading (e.g., https://www.refine.bio/search?search=E-MEXP-3405)
  Accession Codes           Pediatric Cancer Research
  E-MEXP-3405, SRP2422      Yes
  Primary Approach
  Computational Research
  Email
  user@example.com
  Additional Notes
  This is a user's message if any.

  Refine.bio | User's IP address | Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101
  Firefox/120.0 | This message was sent because the request to GitHub failed | Jun 14th, 2024
  */

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
        process.env.GITHUB_TOKEN,
        requestValues,
        requestType
      )
      const hubspotSuccess = await submitHubspotDataRequest(
        process.env.HUBSPOT_ACCESS_TOKEN,
        requestValues,
        requestType
      )

      // requests to Slack only if requests to GitHub and/or HubSpot fail
      if (!githubSuccess || !hubspotSuccess) {
        // sets failed requests' API name(s) to print
        const bothFailed = !githubSuccess && !hubspotSuccess
        const oneFailed = !githubSuccess ? 'GitHub' : 'Hubspot'
        const failedRequest = bothFailed ? 'GitHub and Hubspot' : oneFailed

        const slackSuccess = await submitSlackDataRequest(
          process.env.SLACK_HOOK_URL,
          req,
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
