// Returns a formatted URL safe string
// e.g) 'Transcriptomics and methylomics of human monocytes' to 'transcriptomics-and-methylomics-of-huma-monocytes'
// (resource) https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
const formatURLString = (string) => {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
    .substr(0, 250) // Trim - from end of text
}
// supports CommonJS exports (used in sitemap.js)
module.exports = formatURLString
