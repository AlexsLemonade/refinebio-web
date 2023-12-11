// Hubspot data request
import fetch from 'isomorphic-unfetch'
import { links } from 'config'

// (resouces) HubSpot CRM API v3 https://developers.hubspot.com/docs/api/overview
const request = async (action, email, properties = '') => {
  // TEMP: usng local env var for access token
  const accessToken =
    process.env.HUBSPOT_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN
  const endpointContact = `${links.webhooks.hubspot}/objects/contacts`
  const endpointContactByEmail = `${endpointContact}/${email}?idProperty=email&properties=dataset_request_details`
  const actions = {
    createContact: {
      method: 'POST',
      url: endpointContact
    },
    getContact: {
      method: 'GET',
      url: endpointContactByEmail
    },
    updateContact: {
      method: 'PATCH',
      url: endpointContactByEmail
    }
  }
  const isGet = actions[action].method === 'GET'

  const response = await fetch(actions[action].url, {
    method: actions[action].method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    ...(!isGet ? { body: JSON.stringify(properties) } : {})
  })

  if (isGet) {
    const { status } = response

    if (status === 200) {
      const results = await response.json()

      return { status, results }
    }
    return { status }
  }

  return response
}

// updates an exsisting contact list or creates a new one and adds the requested details
const updateContactList = async (email, newDatasetRequestDetails) => {
  let response
  const properties = {
    email,
    dataset_request_details: newDatasetRequestDetails
  }

  const { status, results } = await request('getContact', email)

  // creates a new contact with dataset request details if no record
  if (status === 404) {
    response = await request('createContact', email, { properties })
  }
  // or updates existing contact's dataset request details
  else {
    const oldDatasetRequestDetails = results.properties?.dataset_request_details

    // concatenates new dataset request details value to existing one
    if (oldDatasetRequestDetails) {
      properties.dataset_request_details = `${newDatasetRequestDetails}\n----------\n${oldDatasetRequestDetails}`
    }

    response = await request('updateContact', email, { properties })
  }

  return response.status >= 200 && response.status < 300
}

// returns false if any errors when updating the contact
export const submitHubspotDataRequest = async (requestValues, requestType) => {
  const {
    accession_codes: accessionCodes,
    approach,
    comments,
    email,
    email_updates: emailUpdates,
    pediatric_cancer: pediatricCancer,
    query
  } = requestValues

  const requestHeading = {
    experiment: `Requested Experiment ${accessionCodes}`,
    search: `Requested Experiment(s) ${accessionCodes} for search term "${query}"`
  }
  const newDatasetRequestDetails = `${requestHeading[requestType]}
  \nPediatric Cancer Research: ${pediatricCancer}
  \nPrimary Approach: ${approach}
  \nAdditional Notes:\n${comments || 'none'}
  \nWants Email Update: ${emailUpdates ? 'Yes' : 'No'}
  \nSubmitted ${new Date().toLocaleString()}`

  try {
    return updateContactList(email, newDatasetRequestDetails)
  } catch {
    return false
  }
}
