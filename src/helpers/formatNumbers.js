// Formats the given number to a locale string (e.g., 1000 to 1,000)
export default (num) => {
  if (!num) return null

  return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(num)
}
