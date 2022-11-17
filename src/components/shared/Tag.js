import { Box, Text } from 'grommet'
import { Close } from '../../images/close.svg'

export const Tag = ({ background = 'alex-navy-tint-90', label }) => {
  return (
    <Box
      color="gray-shade-70"
      direction="row"
      height="24px"
      width="max-content"
    >
      <Box
        background={background}
        pad={{ horizontal: 'xsmall' }}
        margin={{ right: 'xxsmall' }}
        style={{ borderRadius: '20px 0px 0px 20px' }}
      >
        <Text>{label}</Text>
      </Box>
      <Box
        background={background}
        justify="center"
        pad={{ horizontal: 'xxsmall' }}
        style={{ boxShadow: 'none' }}
        onClick={() => {}}
      >
        <Close />
      </Box>
    </Box>
  )
}

export default Tag
