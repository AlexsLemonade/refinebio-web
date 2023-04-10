// Returns a formatted string
// e.g) 'HOMO_SAPIENS' to 'Homo sapiens'
export const formatString = ([first, ...rest]) =>
  [first.toUpperCase(), ...rest.join('').toLowerCase()]
    .join('')
    .replace(/_/g, ' ')
