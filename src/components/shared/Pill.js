import { Box, Paragraph } from 'grommet'

// status: error, info, warning

export const Pill = ({
  background = '',
  color = '',
  label = '',
  labelOnly = false,
  status = '',
  ...props
}) => {
  return (
    <Box
      align="center"
      background={status ? `${status}-bg` : background}
      direction="row"
      flex
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      round="30px"
      width={{ max: 'max-content' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {!labelOnly && (
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
