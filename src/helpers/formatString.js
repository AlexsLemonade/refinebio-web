// Returns a formatted string
// e.g) 'HOMO_SAPIENS' to 'Homo sapiens'
export function formatString([first = '', ...rest]) {
  return [first.toUpperCase(), ...rest.join('').toLowerCase()]
    .join('')
    .replace(/_/g, ' ')
}
