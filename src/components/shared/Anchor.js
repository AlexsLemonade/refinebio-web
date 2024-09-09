import Link from 'next/link'
import { Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'
import gtag from 'analytics/gtag'

const CustomAnchor = styled(GrommetAnchor)`
  ${({ underline, underlineOnHover }) => css`
    box-shadow: none;
    text-decoration: ${underline ? 'underline' : 'none'};
    &:hover {
      text-decoration: ${underlineOnHover ? 'underline' : 'none'};
    }
  `}
`

export const Anchor = ({
  icon,
  href = '',
  linkColor = 'brand',
  underline = false,
  underlineOnHover = true,
  onClick = () => {},
  ...props
}) => {
  const handleClick = () => {
    onClick()
    gtag.trackLinks(href)
  }

  return typeof href === 'string' && href.startsWith('http') ? (
    <CustomAnchor
      href={href}
      icon={icon}
      color={linkColor}
      underline={underline}
      underlineOnHover={underlineOnHover}
      target="_blank"
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  ) : (
    <Link href={href} passHref legacyBehavior>
      <CustomAnchor
        icon={icon}
        color={linkColor}
        underline={underline}
        underlineOnHover={underlineOnHover}
        onClick={handleClick}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Link>
  )
}

export default Anchor
