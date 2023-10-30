import http from 'helpers/http'
import { hubspotForms } from 'config'
// Submits an email subscription to Hubspot's refine.bio downloader form
export default async (email) => {
  const {
    emailSubscription: { portalId, guid, url }
  } = hubspotForms
  const formUrl = `${url}/${portalId}/${guid}`
  const response = await http.post(formUrl, {
    fields: [{ name: 'email', value: email }]
  })

  return response
}
