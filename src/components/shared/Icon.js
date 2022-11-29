import { Text } from 'grommet'
import { SrOnly } from 'components/shared/SrOnly'
import { Info } from '../../images/info.svg'
import { Search } from '../../images/search.svg'
import { Success } from '../../images/success.svg'
import { Warning } from '../../images/warning.svg'

const SVGs = {
  Info,
  Search,
  Success,
  Warning
}

const titles = {
  Github: 'View our refine.bio Github repository',
  Twitter: 'Follow us on Twitter'
}

const sizes = {
  xsmall: '12px',
  small: '16px',
  medium: '24px',
  large: '32px'
}

export const Icon = ({
  color = '',
  size = sizes.medium,
  title = '',
  name,
  link = false
}) => {
  const IconContent = SVGs[name]

  return (
    <Text
      color={color}
      size={sizes[size] || size}
      style={{ color: (!link && color) || 'inherit' }}
    >
      <IconContent
        aria-hidden
        width={sizes[size] || size}
        height={sizes[size] || size}
      />
      <SrOnly>{titles[name] || title}</SrOnly>
    </Text>
  )
}

export default Icon
