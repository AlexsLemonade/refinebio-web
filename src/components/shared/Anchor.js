import Link from 'next/link'
import { Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

const CustomAnchor = styled(GrommetAnchor)`
  ${({ underline }) => css`
    text-decoration: ${underline ? 'underline' : 'none'};
  `}
`

export const Anchor = ({ href = '', icon, underline = false, ...props }) => {
  return typeof href === 'string' && href.startsWith('http') ? (
    <CustomAnchor
      href={href}
      icon={icon}
      underline={underline}
      target="_blank"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  ) : (
    <Link href={href} passHref>
      <CustomAnchor
        icon={icon}
        underline={underline}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Link>
  )
}

export default Anchor
