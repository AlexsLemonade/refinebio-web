// Scrolls to the HTML element with the specified 'id' name
export const scrollToId = (id) => {
  const element = document.getElementById(id)
  element.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}
