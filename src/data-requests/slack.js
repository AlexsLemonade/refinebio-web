// Slack data request
import fetch from 'isomorphic-unfetch'
import { links, requests } from 'config'
import getIP from 'helpers/getIP'

// posts to slack (configured in CCDL channel) and returns true if 200, otherwise false
const postToSlack = async (hookUrl, params) => {
  if (!hookUrl) {
    console.error('Error invalid Url:', hookUrl)
    return false
  }

  try {
    const res = await fetch(hookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return res.ok
  } catch (error) {
    console.error('Error posting to Slack:', error)
    return false
  }
}

export const submitSlackDataRequest = async (
  hookUrl,
  req,
  requestValues,
  requestType,
  failedRequest
) => {
  const ip = await getIP()
  const { data_request: dataRequest, email_logo: logo } = requests
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
  // for security reason, sets originUrl to prod or staging
  // and footer_ico testing is done on staging, not dev
  const {
    headers: { origin }
  } = req
  const { refinebio: prod, refinebio_staging: staging } = links
  const originUrl = origin === prod ? prod : staging
  const requestUrl = dataRequest[requestType]
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

  return postToSlack(hookUrl, {
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
        footer_icon: `${originUrl}/${logo}`,
        ts: Date.now() / 1000 // unix time
      }
    ]
  })
}
