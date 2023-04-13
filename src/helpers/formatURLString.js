// Returns a formatted URL safe string
// e.g) 'Transcriptomics and methylomics of human monocytes' to 'transcriptomics-and-methylomics-of-huma-monocytes'
export default (string) => {
  return string.toLowerCase().replace(/ /g, '-')
}
