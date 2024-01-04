export default (element, config = {}) => {
  element.scrollIntoView({
    ...config,
    behavior: 'smooth'
  })
}
