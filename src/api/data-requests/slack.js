// Slack data request
import fetch from 'isomorphic-unfetch'
import { links } from 'config'
import getIP from 'helpers/getIP'

// posts to slack (configured in CCDL channel) and returns true if 200, otherwise false
const postToSlack = async (params) => {
  const slackHookUrl = process.env.SLACK_HOOK_URL

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
  values,
  requestType,
  failedRequest
) => {
  const ip = await getIP()
  const requestAttachments = {
    experiment: {
      fallback: `${values.accession_codes} Experiment Requested`,
      title: `${values.accession_codes} Experiment Requested`,
      title_link: `${links.refinebio_data_request[requestType]}${values.accession_codes}`
    },
    search: {
      fallback: `Missing data for search term '${values.query}'`,
      title: `Missing data for search term '${values.query}'`,
      title_link: `${links.refinebio_data_request[requestType]}${values.query}`,
      fields: [
        {
          title: 'Accession Codes',
          value: values.accession_codes,
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
            value: values.pediatric_cancer,
            short: true
          },
          {
            title: 'Primary Approach',
            value: values.approach,
            short: true
          },
          {
            title: 'Email',
            value: `${values.email}${
              values.email_updates ? ' _(wants updates)_' : ''
            }`,
            short: false
          },
          ...(values.comments
            ? [
                {
                  title: 'Additional Notes',
                  value: values.comments,
                  short: false
                }
              ]
            : [])
        ],

        footer: `Refine.bio | ${ip} | ${values.navigatorUserAgent} | This message was sent because the request to ${failedRequest} failed`,
        footer_icon: links.refinebio_email_logo,
        ts: Date.now() / 1000 // unix time
      }
    ]
  })
}
