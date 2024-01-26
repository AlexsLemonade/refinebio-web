import { options } from 'config'
// Returns the human redable page number from the offset parameter for pagination
export default (offset, limit) =>
  Number(offset) / (Number(limit) || options.search.pageSizes[0]) + 1
