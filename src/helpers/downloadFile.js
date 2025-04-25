// Bypass a popup blocker and download a file by creating <a> element
// (resource) https://stackoverflow.com/a/42696866
export default (filePath) => {
  const link = document.createElement('a')
  link.href = filePath
  link.download = filePath.substr(filePath.lastIndexOf('/') + 1)
  link.click()
}
