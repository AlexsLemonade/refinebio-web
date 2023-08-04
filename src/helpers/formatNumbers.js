// Formats numbers to a locale string (e.g., 1000 to 1,000)
export default (nums) => {
  if (!nums) return null

  return nums.toLocaleString()
}
