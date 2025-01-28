// Adds 'toAdd' to the array if 'prev' is an array
// Returns 'toAdd' if  'prev' is undefined
// Otherwise, returns [prev, toAdd]
export const getQueryParamValueWith = (prev, toAdd) => {
  if (prev === undefined) return toAdd

  if (Array.isArray(prev)) return [...prev, toAdd]

  return [prev, toAdd]
}

// Removes 'toRemove' from the array if 'prev' is an array
// Returns undefined if:
// - 'prev' is equal to 'toRemove'
// - the array becomes empty after removal
// Otherwise, returns the updated array, its first item, or 'prev' unchanged
export const getQueryParamValueWithout = (prev, toRemove) => {
  if (prev === toRemove) return undefined

  if (Array.isArray(prev)) {
    const updatedPrev = prev.filter((v) => v !== toRemove)

    if (updatedPrev.length === 0) return undefined

    return updatedPrev.length === 1 ? updatedPrev[0] : updatedPrev
  }

  return prev
}
