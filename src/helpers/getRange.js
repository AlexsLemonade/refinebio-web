// Returns an array of consecutive numbers from 1 to n (n > 1)
export default (n) => {
  const result = []
  for (let i = 1; i <= n; i += 1) {
    result.push(i)
  }
  return result
}
