import { memo } from 'react'
import { Box } from 'grommet'

export const Resizer = ({ isResizing, ...props }) => {
  return (
    <Box
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={{
        boxShadow: 'none',
        cursor: 'col-resize',
        display: 'inline-block',
        position: 'absolute',
        right: 0,
        top: 0,
        touchAction: 'none',
        transform: ' translateX(50%)',
        zIndex: 0
      }}
      width={isResizing ? '100%' : '16px'}
      height="100%"
    />
  )
}

export default memo(Resizer)
