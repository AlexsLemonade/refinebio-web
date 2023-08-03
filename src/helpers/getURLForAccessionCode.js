// Returns the external accession code URL based on a given accession code
export default (accessionCode) => {
  if (!accessionCode) return ''

  if (accessionCode.startsWith('GSE')) {
    return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${accessionCode}`
  }

  if (accessionCode.startsWith('RP', 1)) {
    return `https://www.ebi.ac.uk/ena/data/view/${accessionCode}`
  }

  if (accessionCode.startsWith('E-')) {
    return `https://www.ebi.ac.uk/arrayexpress/experiments/${accessionCode}`
  }

  return ''
}
