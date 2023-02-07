// Returns the external accession code URL based on a given accession code
export function getURLForAccessionCode(accessionCode) {
  if (!accessionCode) return ''
  let mainUrl = ''
  if (accessionCode.startsWith('GSE')) {
    mainUrl = 'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='
  } else if (accessionCode.startsWith('RP', 1)) {
    mainUrl = 'https://www.ebi.ac.uk/ena/data/view/'
  } else if (accessionCode.startsWith('E-')) {
    mainUrl = 'https://www.ebi.ac.uk/arrayexpress/experiments/'
  }
  return mainUrl + accessionCode
}
