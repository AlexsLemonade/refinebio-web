// Returns true if 'value' is a valid URL
// (resource) https://stackoverflow.com/a/34695026/763705
export const isValidURL = (value) => {
  const a = document.createElement('a')
  a.href = value
  return a.host && a.host !== window.location.host
}
