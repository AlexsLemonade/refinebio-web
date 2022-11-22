// retrun the edgeSize object using the specified base unit(base) and range(min, max)

export const makeEdgeSizes = (base, min, max) =>
  Object.fromEntries(
    Array.from(Array(max - min + 1).keys()).map((x) => [
      `basex${x + min}`,
      `${(x + min) * base}px`
    ])
  )
