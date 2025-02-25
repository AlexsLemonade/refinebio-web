import { Children, cloneElement, useState } from 'react'
import { Box, Text } from 'grommet'
import isFunction from 'helpers/isFunction'
import { CheckBox } from 'components/CheckBox'
import { ExpandableBlock } from 'components/ExpandableBlock'
import { Icon } from 'components/Icon'

export const Accordion = (props) => {
  const getChildrenCount = () => {
    return Children.count(props.children)
  }

  const [activeElements, setActiveElements] = useState(
    new Array(getChildrenCount()).fill(false)
  )

  const isAllExpanded = !activeElements.includes(false)

  const handleToggleAll = () => {
    if (isAllExpanded) {
      setActiveElements(new Array(getChildrenCount()).fill(false))
    } else {
      setActiveElements(new Array(getChildrenCount()).fill(true))
    }
  }

  const handleToggle = (index) => {
    setActiveElements(() =>
      activeElements.map((x, i) => (i === index ? !x : x))
    )
  }

  const children = Children.map(
    props.children,
    (child, i) =>
      child &&
      cloneElement(child, {
        expand: activeElements[i],
        handleToggle: () => handleToggle(i)
      })
  )

  return (
    <Box margin={{ top: 'xsmall' }}>
      {!props.hideExpandAll && children.length > 1 && (
        <Box margin={{ bottom: 'small' }}>
          <CheckBox
            label="Expand all"
            onClick={() => handleToggleAll()}
            checked={isAllExpanded}
          />
        </Box>
      )}
      {children}
    </Box>
  )
}

export const AccordionPanel = ({
  title,
  children,
  handleToggle,
  expand,
  duration = '.45s',
  maxHeight = '99vh'
}) => {
  const hasChildren = Children.count(children) > 0

  return (
    <Box
      border={{ side: 'horizontal', color: 'gray-shade-5' }}
      margin={{ bottom: 'small' }}
      pad={{ top: 'small' }}
    >
      <Box direction="row" justify="between">
        <Box margin={{ bottom: 'xsmall' }} width={{ min: '160px' }}>
          {isFunction(title) ? title(expand) : title}
        </Box>

        {hasChildren && (
          <Box
            aria-label="Expand this list"
            role="button"
            margin={{ right: 'small' }}
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
        <ExpandableBlock
          expand={expand}
          duration={duration}
          timing="linear"
          maxHeight={maxHeight}
        >
          {children}
        </ExpandableBlock>
      )}
    </Box>
  )
}
