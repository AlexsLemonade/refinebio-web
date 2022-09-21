import { Box, Paragraph } from 'grommet'

export const Pill = ({
  label = '',
  color = 'alex-navy',
  background = 'alex-navy-tint-90',
  bullet = 'true'
}) => {
  return (
    <Box
      align="center"
      background={background}
      direction="row"
      flex
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      round="30px"
      width="max-content"
    >
      {bullet && (
        <Box
          background={color}
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
