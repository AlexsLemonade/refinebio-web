import { Text } from 'grommet'
import { SrOnly } from 'components/shared/SrOnly'
import { ChevronDown } from '../../images/chevron-down.svg'
import { ChevronUp } from '../../images/chevron-up.svg'
import { Close } from '../../images/close.svg'
import { Collapse } from '../../images/collapse.svg'
import { Expand } from '../../images/expand.svg'
import { Filter } from '../../images/filter.svg'
import { Github } from '../../images/github.svg'
import { Info } from '../../images/info.svg'
import { Search } from '../../images/search.svg'
import { Success } from '../../images/success.svg'
import { Twitter } from '../../images/twitter.svg'
import { Warning } from '../../images/warning.svg'

const SVGs = {
  ChevronDown,
  ChevronUp,
  Close,
  Collapse,
  Expand,
  Filter,
  Github,
  Info,
  Search,
  Success,
  Twitter,
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
  link = false,
  margin,
  name,
  size = sizes.medium,
  title = ''
}) => {
  const IconContent = SVGs[name]

  return (
    <Text
      color={color}
      margin={margin}
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
