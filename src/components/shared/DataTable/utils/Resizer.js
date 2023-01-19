import { memo } from 'react'
import { Box } from 'grommet'

export const Resizer = ({ isResizing, ...props }) => {
  return (
    <Box
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      background={isResizing ? 'gray-shade-5' : 'none'}
      style={{
        boxShadow: 'none',
        cursor: 'move',
        display: 'inline-block',
        position: 'absolute',
        right: 0,
        top: 0,
        touchAction: 'none',
        transform: ' translateX(50%)',
        zIndex: 0
      }}
      width="15px"
      height="100%"
    />
  )
}

export default memo(Resizer)
