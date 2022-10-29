import { Box, Header as GrommetHeader } from 'grommet'
import { Button } from 'components/shared/Button'
import { Logo } from './Logo'
import { GlobalNav } from './GlobalNav'

export const Header = ({ light = false, ...props }) => {
  return (
    <GrommetHeader
      justify="center"
      pad={{ top: 'medium' }}
      role="banner"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Logo light={light} />
      <Box align="center" direction="row">
        <GlobalNav light={light} />
        <Button
          label="My Dataset"
          badge={{ max: 10000, value: 0 }}
          light={light}
          margin={{ left: 'small' }}
          secondary
        />
      </Box>
    </GrommetHeader>
  )
}

export default Header
