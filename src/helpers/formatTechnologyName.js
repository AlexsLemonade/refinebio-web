import formatString from 'helpers/formatString'

export default (option) => {
  const rnaSeq = 'RNA-seq' // 'rna-seq' should be rendered as 'RNA-seq' in UI

  return option.match(rnaSeq.toLowerCase()) ? rnaSeq : formatString(option)
}
