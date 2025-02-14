import Router from 'next/router'
import Link from 'next/link'
import { resolveHref } from 'next/dist/shared/lib/router/utils/resolve-href'
// import { resolveHref } from 'next/dist/client/resolve-href' (Next v14)
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
  // No official support for this yet, converts href to string
  const [link] = resolveHref(Router, href, true)
  const handleClick = () => {
    onClick()
    gtag.trackLink(link)
  }

  return link && link.startsWith('http') ? (
    <CustomAnchor
      href={link}
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
