import { Box, Paragraph } from 'grommet'

// status: error, info, warning

export const Pill = ({
  background = '',
  color = '',
  label = '',
  dot = true,
  status = ''
}) => {
  return (
    <Box
      align="center"
      background={status ? `${status}-bg` : background}
      direction="row"
      flex
      pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
      round="30px"
      width="max-content"
    >
      {dot && (
        <Box
          background={status || color}
          width="7px"
          height="7px"
          margin={{ right: 'xsmall' }}
          round="50%"
        />
      )}
      <Paragraph color="black">{label}</Paragraph>
    </Box>
  )
}
