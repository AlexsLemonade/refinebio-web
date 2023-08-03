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
        zIndex: 1
      }}
      width={isResizing ? '100%' : '24px'}
      height="100%"
      onClick={(e) => e.stopPropagation()}
    />
  )
}

export default memo(Resizer)
