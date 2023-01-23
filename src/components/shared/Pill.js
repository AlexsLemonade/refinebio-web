import { Box, Paragraph } from 'grommet'

// status: error, info, warning, success

export const Pill = ({
  background = '',
  color = '',
  label = '',
  dot = true,
  dotSize = '7px',
  round = '30px',
  status = '',
  props
}) => {
  return (
    <Box
      align="center"
      background={status ? `${status}-bg` : background}
      direction="row"
      flex
      pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
      round={round}
      width="max-content"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {dot && (
        <Box
          background={status || color}
          width={dotSize}
          height={dotSize}
          margin={{ right: 'xsmall' }}
          round="50%"
        />
      )}
      <Paragraph color="black">{label}</Paragraph>
    </Box>
  )
}

export default Pill
