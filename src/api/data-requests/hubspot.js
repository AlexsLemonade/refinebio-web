// Hubspot data request
import fetch from 'isomorphic-unfetch'
// Hubspot list URL https://app.hubspot.com/contacts/[PORTAL_ID]/lists/[listId]
// (resouces)
// Contacts API https://developers.hubspot.com/docs/methods/contacts/contacts-overview
// Contact Lists API https://developers.hubspot.com/docs/methods/lists/contact-lists-overview

const request = async (action, query) => {
  // TEMP: usng local env var for api key
  const hubspotApiKey =
    process.env.HUBSPOT_APIKEY || process.env.NEXT_PUBLIC_HUBSPOT_APIKEY
  // TEMP: usng test ccdl data requesterslist ID
  const listId =
    process.env.HUBSPOT_LIST_ID || process.env.NEXT_PUBLIC_HUBSPOT_LIST_ID
  const apiKeyQuery = `?hapikey=${hubspotApiKey}`
  const apiUrl = 'https://api.hubapi.com/contacts/v1/'
  const urls = {
    // creates a contact
    create: `${apiUrl}contact/${apiKeyQuery}`,
    // adds a new contact to list
    add: `${apiUrl}lists/${listId}/add${apiKeyQuery}`,
    // gets contact by email
    get: `${apiUrl}contact/email/${query}/profile${apiKeyQuery}`,
    // updates a contact by email
    update: `${apiUrl}contact/email/${query}/profile${apiKeyQuery}`
  }
  const isGet = action === 'get'
  const method = isGet ? 'GET' : 'POST'

  const response = await fetch(urls[action], {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    ...(!isGet ? { body: JSON.stringify(query) } : {})
  })

  if (isGet) {
    const { status } = response
    const json = await response.json()

    if (json.status !== 'error' && json.properties.dataset_request_details) {
      return {
        status,
        datasetRequestDetails: json.properties.dataset_request_details.value
      }
    }

    return { status }
  }

  return response
}

// updates an exsisting contact list or creates a new one and adds the requested details
const updateContactList = async (email, newDetails) => {
  let details = newDetails

  const contactData = await request('get', email)

  // creates a new contact email if it doesn't exist
  if (contactData.status === 404) {
    await request('create', {
      properties: [
        {
          property: 'email',
          value: email
        },
        {
          property: 'dataset_request_details',
          value: details
        }
      ]
    })
  }
  // updates existing contact otherwise
  else {
    const oldDatasetRequestDetails = contactData.datasetRequestDetails

    // appends the requested details to the old data's fields if the existing contact already has it
    if (oldDatasetRequestDetails !== undefined) {
      details = `${newDetails}\n----------\n${oldDatasetRequestDetails}`
    }

    await request('update', email, {
      properties: [
        {
          property: 'dataset_request_details',
          value: details
        }
      ]
    })
  }

  const response = await request('add', {
    emails: [email]
  })
  return response.ok
}

// returns false if there are any errors with updating the contact list
export const submitHubspotDataRequest = async (values, requestType) => {
  const requestHeading = {
    experiment: `Requested experiment ${values.accession_codes}`,
    search: `Requested experiment(s) ${values.accession_codes} for search term "${values.query}"`
  }
  const newDetails = `${
    requestHeading[requestType]
  }\nPediatric cancer research: ${values.pediatric_cancer}\nPrimary approach: ${
    values.approach
  }\n\nAdditional Notes:\n${values.comments ? values.comments : 'none'}\n\n${
    values.email_updates
      ? '(Wants email updates)'
      : '(Does not want email updates)'
  }\nSubmitted ${new Date().toLocaleString()}`

  try {
    return updateContactList(values.email, newDetails)
  } catch {
    return false
  }
}
