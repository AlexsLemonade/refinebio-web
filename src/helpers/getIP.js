// Returns a user's public IP address
// (resource) https://www.ipify.org
export default async () => {
  try {
    const resp = await fetch('https://api.ipify.org?format=json')
    const json = await resp.json()
    return json.ip || 'Unknown IP'
  } catch {
    return 'Unknown IP'
  }
}
