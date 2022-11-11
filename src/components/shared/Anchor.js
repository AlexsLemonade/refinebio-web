import Link from 'next/link'
import { Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

const CustomAnchor = styled(GrommetAnchor)`
  ${({ defaultUnderline, icon, underline }) => css`
    text-decoration: ${defaultUnderline ? 'underline' : 'none'};
    &:hover,
    &:focus {
      text-decoration: ${icon || underline ? 'underline' : 'none'};
    }
  `}
  ${({ icon }) =>
    icon &&
    css`
      padding: 0;
    `}
`

export const Anchor = ({
  defaultUnderline = false,
  href = '',
  icon,
  underline = true,
  ...props
}) => {
  return typeof href === 'string' && href.startsWith('http') ? (
    <CustomAnchor
      defaultUnderline={defaultUnderline}
      href={href}
      icon={icon}
      target="_blank"
      underline={underline}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  ) : (
    <Link href={href} passHref>
      <CustomAnchor
        defaultUnderline={defaultUnderline}
        icon={icon}
        underline={underline}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Link>
  )
}

export default Anchor
