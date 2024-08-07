// Hubspot data request
import fetch from 'isomorphic-unfetch'
import { requests } from 'config'

// (resouces) HubSpot CRM API v3 https://developers.hubspot.com/docs/api/overview
const request = async (action, token, properties = '') => {
  const endpointContacts = `${requests.hubspot_hook}/objects/contacts`
  const endpointSearchContact = `${endpointContacts}/search`
  const endpointUpdateContactByEmail = `${endpointContacts}/${properties.email}?idProperty=email`
  const actions = {
    createContact: {
      method: 'POST',
      url: endpointContacts,
      body: { properties }
    },
    searchContact: {
      method: 'POST',
      url: endpointSearchContact,
      body: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: properties.email
              }
            ]
          }
        ],
        properties: ['dataset_request_details']
      }
    },
    updateContact: {
      method: 'PATCH',
      url: endpointUpdateContactByEmail,
      body: { properties }
    }
  }

  const { method, url, body } = actions[action]

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return response
  } catch (error) {
    console.error('Error requesting to HubSpot API:', error)
    return { status: 500 } // returns 500 if an exception occurs
  }
}

// updates the exsisting contact or creates a new one
const updateContactList = async (token, email, newDatasetRequestDetails) => {
  let response
  const properties = {
    email,
    dataset_request_details: newDatasetRequestDetails
  }

  try {
    // checks if the contact already exists
    const searchResponse = await request('searchContact', token, { email })
    const contactResponse = await searchResponse.json()
    const { total, results } = contactResponse

    if (total === 1) {
      const oldDatasetRequestDetails =
        results[0].properties?.dataset_request_details
      // appends the new data request details to the existing one if the contact already has the property
      if (oldDatasetRequestDetails) {
        properties.dataset_request_details = `${newDatasetRequestDetails}\n----------\n${oldDatasetRequestDetails}`
      }
      response = await request('updateContact', token, properties)
    } else {
      response = await request('createContact', token, properties)
    }

    return response.status >= 200 && response.status < 300
  } catch (error) {
    console.error('Error updating contact:', error)
    return false
  }
}

// returns false if any errors when updating the contact
export const submitHubspotDataRequest = async (
  token,
  requestValues,
  requestType
) => {
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
    return await updateContactList(token, email, newDatasetRequestDetails)
  } catch (error) {
    console.error('Error submitting the data request to Hubspot API:', error)
    return false
  }
}
