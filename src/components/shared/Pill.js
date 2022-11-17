import { Box, Paragraph } from 'grommet'

// status: error, info, warning

export const Pill = ({
  background = '',
  color = '',
  label = '',
  dot = true,
  status = ''
}) => {
  const RADIUS = '30px'
  const DOT_HEIGHT = '7px'

  return (
    <Box
      align="center"
      background={status ? `${status}-bg` : background}
      direction="row"
      flex
      pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
      round={RADIUS}
      width="max-content"
    >
      {dot && (
        <Box
          background={status || color}
          width={DOT_HEIGHT}
          height={DOT_HEIGHT}
          margin={{ right: 'xsmall' }}
          round="50%"
        />
      )}
      <Paragraph color="black">{label}</Paragraph>
    </Box>
  )
}

export default Pill
