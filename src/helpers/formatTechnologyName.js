import formatString from 'helpers/formatString'

// 'rna-seq' should be rendered as 'RNA-seq' in UI
const technologyNamesToFormat = { 'rna-seq': 'RNA-seq' }

export default (option) => {
  return technologyNamesToFormat[option.toLowerCase()] || formatString(option)
}
