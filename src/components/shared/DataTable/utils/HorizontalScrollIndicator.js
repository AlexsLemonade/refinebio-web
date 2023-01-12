import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'

export const HorizontalScrollIndicator = ({
  isFirstCellVisible,
  isLastCellVisible,
  handleScroll
}) => {
  const { viewport } = useResponsive()

  return (
    <>
      {viewport !== 'large' && (
        <Box
          align="center"
          animation={{
            type: isFirstCellVisible ? 'fadeOut' : 'fadeIn',
            duration: isFirstCellVisible ? 500 : 800
          }}
          background="gradient_left"
          justify="center"
          height="100%"
          style={{
            overflow: 'visible',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 200
          }}
          width="30px"
        >
          <Button
            aria-label="Scroll to left"
            disabled={isFirstCellVisible}
            icon={<Icon name="ChevronLeft" size="xsmall" aria-hidden />}
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
          disabled={isLastCellVisible}
          icon={<Icon name="ChevronRight" size="xsmall" aria-hidden />}
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

export default memo(HorizontalScrollIndicator)
