// Returns the appropriate custom heading sizes
// size - xsmall, small, medium, large, xlarge
// level 1 to 5
export const getHeadingSize = (size, level) => {
  switch (size) {
    case 'xsmall':
      return `h${level}XSmall`
    case 'small':
      return `h${level}Small`
    case 'medium':
      return `h${level}Medium`
    case 'large':
      return `h${level}Large`
    case 'xlarge':
      return `h${level}XLarge`
    default:
      return ''
  }
}

export default getHeadingSize
