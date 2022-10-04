import { Anchor as GrommetAnchor, Box } from 'grommet'

export const Link = ({ underline = false, ...props }) => {
  return (
    <Box>
      <GrommetAnchor
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={underline ? { textDecoration: 'underline' } : null}
      />
    </Box>
  )
}
