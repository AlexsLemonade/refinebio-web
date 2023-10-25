import { links } from 'config'

// Returns the external accession code URL based on a given accession code
export default (accessionCode) => {
  const {
    accession_code_urls: { array_express: arrayExpress, ena, geo }
  } = links

  if (!accessionCode) return ''

  if (accessionCode.startsWith('GSE')) {
    return `${geo}${accessionCode}`
  }

  if (accessionCode.startsWith('RP', 1)) {
    return `${ena}${accessionCode}`
  }

  if (accessionCode.startsWith('E-')) {
    return `${arrayExpress}${accessionCode}`
  }

  return ''
}
