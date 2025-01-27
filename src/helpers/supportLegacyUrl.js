import { options } from 'config'

const legacyQueryParams = ['empty', 'p', 'q', 'size']

export const isLegacyUrl = (query) => {
  const keys = Object.keys(query)
  return legacyQueryParams.some((q) => keys.includes(q))
}

export const getNewQueryParams = (query) => {
  const { empty, p, q, size } = query
  const newQueryParams = { ...query }

  if (empty !== undefined) {
    const {
      search: { numDownloadableSamples }
    } = options

    newQueryParams[numDownloadableSamples.key] =
      empty === 'true'
        ? numDownloadableSamples.include
        : numDownloadableSamples.exclude
    delete newQueryParams.empty
  }

  if (p !== undefined) {
    const page = Number(p || 1)
    const limit = Number(size || 10)
    newQueryParams.offset = (page - 1) * limit
    delete newQueryParams.p
  }

  if (q !== undefined) {
    newQueryParams.search = q
    delete newQueryParams.q
  }

  if (size !== undefined) {
    newQueryParams.limit = Number(size || 10)
    delete newQueryParams.size
  }

  return newQueryParams
}
