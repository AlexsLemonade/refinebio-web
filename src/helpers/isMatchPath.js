import isArray from 'helpers/isArray'
// Returns true if the 'path'(a pathname or an array of pathnaes) matches the 'pathmae' (Next.js router object's pathname property)
export default (pathname, path) => {
  if (isArray(path)) {
    return path.includes(pathname)
  }

  return pathname === path
}
