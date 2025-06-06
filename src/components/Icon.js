import { Text } from 'grommet'
import { SrOnly } from 'components/SrOnly'
import { ChevronDown } from '../images/chevron-down.svg'
import { ChevronUp } from '../images/chevron-up.svg'
import { ChevronLeft } from '../images/chevron-left.svg'
import { ChevronRight } from '../images/chevron-right.svg'
import { Close } from '../images/close.svg'
import { Collapse } from '../images/collapse.svg'
import { Expand } from '../images/expand.svg'
import { Filter } from '../images/filter.svg'
import { Github } from '../images/github.svg'
import { Help } from '../images/help.svg'
import { Info } from '../images/info.svg'
import { Search } from '../images/search.svg'
import { Success } from '../images/success.svg'
import { Sync } from '../images/sync.svg'
import { Bluesky } from '../images/bluesky.svg'
import { Twitter } from '../images/twitter.svg'
import { Warning } from '../images/warning.svg'

const SVGs = {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Close,
  Collapse,
  Expand,
  Filter,
  Github,
  Help,
  Info,
  Search,
  Success,
  Sync,
  Bluesky,
  Twitter,
  Warning
}

const titles = {
  Github: 'View our refine.bio Github repository',
  Bluesky: 'Follow us on Bluesky',
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
      style={{
        color: (!link && color) || 'inherit',
        height: size,
        width: size
      }}
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
