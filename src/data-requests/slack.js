// Slack data request
import fetch from 'isomorphic-unfetch'
import { links } from 'config'
import getIP from 'helpers/getIP'

// posts to slack (configured in CCDL channel) and returns true if 200, otherwise false
const postToSlack = async (params) => {
  // TEMP: usng the webhook url for the ccdl test channel for dev
  const slackHookUrl =
    process.env.SLACK_HOOK_URL || process.env.NEXT_PUBLIC_SLACK_HOOK_URL

  try {
    const res = await fetch(slackHookUrl, {
      method: 'POST',
      body: JSON.stringify(params)
    })
    return res.ok
  } catch {
    return false
  }
}

export const submitSlackDataRequest = async (
  requestValues,
  requestType,
  failedRequest
) => {
  const ip = await getIP()
  const {
    accession_codes: accessionCodes,
    approach,
    comments,
    email,
    emailUpdates,
    navigatorUserAgent,
    pediatric_cancer: pediatricCancer,
    query
  } = requestValues
  const requestUrl = links.refinebio_data_request[requestType]
  const requestAttachments = {
    experiment: {
      fallback: `${accessionCodes} Experiment Requested`,
      title: `${accessionCodes} Experiment Requested`,
      title_link: `${requestUrl}${accessionCodes}`
    },
    search: {
      fallback: `Missing data for search term '${query}'`,
      title: `Missing data for search term '${query}'`,
      title_link: `${requestUrl}${query}`,
      fields: [
        {
          title: 'Accession Codes',
          value: accessionCodes,
          short: true
        }
      ]
    }
  }

  return postToSlack({
    attachments: [
      {
        color: '#2eb886',
        ...requestAttachments[requestType],
        fields: [
          ...(requestAttachments[requestType].fields || []),
          {
            title: 'Pediatric Cancer Research',
            value: pediatricCancer,
            short: true
          },
          {
            title: 'Primary Approach',
            value: approach,
            short: true
          },
          {
            title: 'Email',
            value: `${email}${emailUpdates ? ' _(wants updates)_' : ''}`,
            short: false
          },
          ...(comments
            ? [
                {
                  title: 'Additional Notes',
                  value: comments,
                  short: false
                }
              ]
            : [])
        ],

        footer: `Refine.bio | ${ip} | ${navigatorUserAgent} | This message was sent because the request to ${failedRequest} failed`,
        footer_icon: links.refinebio_email_logo,
        ts: Date.now() / 1000 // unix time
      }
    ]
  })
}