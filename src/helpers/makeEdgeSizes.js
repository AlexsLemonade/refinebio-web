// Returns the Grommet edgeSize object(in themes/global)
// using the specified base unit(base) and range values(min, max)

export default (base, min, max) =>
  Object.fromEntries(
    Array.from(Array(max - min + 1).keys()).map((x) => [
      `basex${x + min}`,
      `${(x + min) * base}px`
    ])
  )
