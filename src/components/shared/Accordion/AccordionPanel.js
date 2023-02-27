import { Children } from 'react'
import { isFunction } from 'helpers/isFunction'
import { Box, Text } from 'grommet'
import { ExpandableBlock } from 'components/shared/ExpandableBlock'
import { Icon } from 'components/shared/Icon'

export const AccordionPanel = ({ title, children, handleToggle, expand }) => {
  const hasChildren = Children.count(children) > 0

  return (
    <Box
      border={{ side: 'horizontal', color: 'gray-shade-5' }}
      pad={{ vertical: 'small' }}
    >
      <Box direction="row" justify="between">
        <Box margin={{ bottom: 'xsmall' }} width={{ min: '160px' }}>
          {isFunction(title) ? title(expand) : title}
        </Box>

        {hasChildren && (
          <Box
            aria-label="Expand this list"
            role="button"
            style={{ boxShadow: 'none' }}
            onClick={handleToggle}
          >
            <Text color="black">
              {expand ? (
                <Icon name="ChevronUp" size="xsmall" />
              ) : (
                <Icon name="ChevronDown" size="xsmall" />
              )}
            </Text>
          </Box>
        )}
      </Box>

      {hasChildren && (
        <ExpandableBlock duration=".5s" opacity={0.3} expand={expand}>
          {children}
        </ExpandableBlock>
      )}
    </Box>
  )
}

export default AccordionPanel
