import { Anchor as GrommetAnchor, Box } from 'grommet'

export const Link = ({ ...props }) => {
  return (
    <Box>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetAnchor {...props} />
    </Box>
  )
}
