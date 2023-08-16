// abbreviates the given number with the specified decimal place value
// (original) https://stackoverflow.com/q/2692323
export default (number, decPlaces = 1) => {
  const decNumber = 10 ** decPlaces
  const abbrev = ['k', 'm', 'b', 't']
  let count = abbrev.length - 1
  let temp = number

  while (count >= 0) {
    const size = 10 ** ((count + 1) * 3)

    if (size <= temp) {
      temp = Math.round((temp * decNumber) / size) / decNumber
      temp += abbrev[count]
      break
    }
    count -= 1
  }

  return temp
}
