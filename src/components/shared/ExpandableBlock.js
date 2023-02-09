import { Box } from 'grommet'

export const ExpandableBlock = ({
  dureation = '.8s',
  expand,
  opacity = 0.75,
  maxHeight = '200px',
  timing = 'cubic-bezier(.61,.36,.24,1.05)',
  children,
  ...props
}) => {
  return (
    <Box
      margin={{ bottom: 'xsmall' }}
      style={{
        opacity: expand ? 1 : opacity,
        overflow: 'hidden',
        maxHeight: expand ? maxHeight : 0,
        transition: `all ${dureation} ${timing}`
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default ExpandableBlock
