// abbreviates the given number with the specified decimal place
// (original) https://stackoverflow.com/q/2692323
export default (number, decPlace = 1) => {
  const decValue = 10 ** decPlace
  const abbrev = ['K', 'M', 'B', 'T']
  let count = abbrev.length - 1
  let temp = number

  while (count >= 0) {
    const size = 10 ** ((count + 1) * 3)

    if (size <= temp) {
      temp = Math.round((temp * decValue) / size) / decValue
      temp += abbrev[count]
      break
    }
    count -= 1
  }

  return temp
}
