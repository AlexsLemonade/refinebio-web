import isWindow from 'helpers/isWindow'

// NOTE: migration support is removed 12 months after the site swap
export const getOldLocalStorageKey = (key) =>
  isWindow ? window.localStorage.getItem(key) : false

export const removeOldLocalStorageKey = (key) =>
  isWindow ? window.localStorage.removeItem(key) : false
