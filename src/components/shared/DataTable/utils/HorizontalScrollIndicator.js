import { memo } from 'react'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'

export const HorizontalScrollIndicator = ({ isIntersecting, handleScroll }) => {
  return (
    <Box
      align="center"
      animation={{
        type: isIntersecting ? 'fadeOut' : 'fadeIn',
        duration: isIntersecting ? 500 : 800
      }}
      background="gradient_right"
      justify="center"
      height="100%"
      style={{
        overflow: 'visible',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 200
      }}
      width="30px"
    >
      <Button
        aria-label="Scroll to right"
        disabled={isIntersecting}
        icon={<Icon name="ChevronRight" size="xsmall" aria-hidden />}
        primary
        style={{
          cursor: isIntersecting ? 'default' : 'pointer',
          padding: '10px 4px',
          position: 'absolute',
          right: '-50%',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        clickHandler={() => handleScroll(200)}
      />
    </Box>
  )
}

export default memo(HorizontalScrollIndicator)
