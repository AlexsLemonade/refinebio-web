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

  return isGet ? response.status : response
}

// updates an exsisting contact list or creates a new one and adds the requested details
const updateContactList = async (email, newDatasetRequestDetails) => {
  let response
  const properties = {
    email,
    dataset_request_details: newDatasetRequestDetails
  }

  const { status } = await request('getContact', email)

  // creates a new contact with dataset request details if no record
  if (status === 404) {
    response = await request('createContact', email, { properties })
  }
  // or updates existing contact's dataset request details
  else {
    response = await request('updateContact', email, { properties })
  }

  return response.status >= 200 && response.status < 300
}

// returns false if any errors when updating the contact
export const submitHubspotDataRequest = async (requestValues, requestType) => {
  const requestHeading = {
    experiment: `Requested Experiment ${requestValues.accession_codes}`,
    search: `Requested Experiment(s) ${requestValues.accession_codes} for search term "${requestValues.query}"`
  }
  const newDatasetRequestDetails = `${requestHeading[requestType]}
  \nPediatric Cancer Research: ${requestValues.pediatric_cancer}
  \nPrimary Approach: ${requestValues.approach}
  \nAdditional Notes:\n${
    requestValues.comments ? requestValues.comments : 'none'
  }\nWants Email Update: ${requestValues.email_updates ? 'Yes' : 'No'}
  \nSubmitted ${new Date().toLocaleString()}`

  try {
    return updateContactList(requestValues.email, newDatasetRequestDetails)
  } catch {
    return false
  }
}
