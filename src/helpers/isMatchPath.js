import { isArray } from './isArray'
// Returns true if the 'path'(a pathname or an array of pathnaes) matches the 'pathmae' (Next.js router object's pathname property)

export const isMatchPath = (pathname, path) => {
  if (isArray(path)) {
    return path.includes(pathname)
  }

  return pathname === path
}
