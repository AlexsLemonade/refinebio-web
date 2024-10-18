// Returns a page number for pagination from the given offset parameter value
export default (offset = 0, limit = 10) => Number(offset) / Number(limit) + 1
