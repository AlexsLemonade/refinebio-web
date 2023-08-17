import { memo } from 'react'
import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'

export const XScrollIndicator = ({
  isFirstCellVisible,
  isLastCellVisible,
  target
}) => {
  const { viewport } = useResponsive()

  const handleScroll = (value) => {
    target.scrollBy({
      top: 0,
      left: value,
      behavior: 'smooth'
    })
  }
  return (
    <>
      {viewport !== 'large' && (
        <Box
          align="center"
          animation={{
            type: isFirstCellVisible ? 'fadeOut' : 'fadeIn',
            duration: isFirstCellVisible ? 500 : 800
          }}
          background="gradientLeft"
          justify="center"
          height="100%"
          style={{
            overflow: 'visible',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 3
          }}
          width="30px"
        >
          <Button
            aria-label="Scroll to left"
            disabled={isFirstCellVisible}
            gap="none"
            icon={<Icon name="ChevronLeft" size="xsmall" />}
            primary
            style={{
              cursor: isFirstCellVisible ? 'default' : 'pointer',
              padding: '10px 4px',
              position: 'absolute',
              left: '-50%',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            clickHandler={() => handleScroll(-200)}
          />
        </Box>
      )}
      <Box
        align="center"
        animation={{
          type: isLastCellVisible ? 'fadeOut' : 'fadeIn',
          duration: isLastCellVisible ? 500 : 800
        }}
        background="gradientRight"
        justify="center"
        height="100%"
        style={{
          overflow: 'visible',
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 3
        }}
        width="30px"
      >
        <Button
          aria-label="Scroll to right"
          disabled={isLastCellVisible}
          gap="none"
          icon={<Icon name="ChevronRight" size="xsmall" />}
          primary
          style={{
            cursor: isLastCellVisible ? 'default' : 'pointer',
            padding: '10px 4px',
            position: 'absolute',
            right: '-50%',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
          clickHandler={() => handleScroll(200)}
        />
      </Box>
    </>
  )
}

export default memo(XScrollIndicator)
