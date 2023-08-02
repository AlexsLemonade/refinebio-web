import Link from 'next/link'
import { Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

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
  ...props
}) => {
  return typeof href === 'string' && href.startsWith('http') ? (
    <CustomAnchor
      href={href}
      icon={icon}
      color={linkColor}
      underline={underline}
      underlineOnHover={underlineOnHover}
      target="_blank"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  ) : (
    <Link href={href} passHref>
      <CustomAnchor
        icon={icon}
        color={linkColor}
        underline={underline}
        underlineOnHover={underlineOnHover}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Link>
  )
}

export default Anchor
