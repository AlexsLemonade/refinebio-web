// TEMPORARY for testing
import { http } from '../http'

const url = 'experiments/'

export const experiments = {
  get: (accessionCode) => {
    const path = `${url}${accessionCode}/`

    return http.get(path)
  }
}
