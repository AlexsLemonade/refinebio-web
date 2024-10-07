// Scrolls to the top of the page
export default (config = {}) => {
  const defaultConfig = { top: 0, behavior: 'smooth' }
  window.scrollTo({ ...defaultConfig, ...config })
}
