import { Children, cloneElement, useState } from 'react'
import { Box } from 'grommet'
import { CheckBox } from 'components/shared/CheckBox'

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

export default Accordion
