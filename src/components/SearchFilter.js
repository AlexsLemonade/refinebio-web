import { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import styled, { css } from 'styled-components'
import gtag from 'analytics/gtag'
import { useSearchManager } from 'hooks/useSearchManager'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import formatFilterName from 'helpers/formatFilterName'
import formatNumbers from 'helpers/formatNumbers'
import getReadable from 'helpers/getReadable'
import isLastIndex from 'helpers/isLastIndex'
import { Button as sharedButton } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { SearchBox } from 'components/SearchBox'
import { TextHighlight } from 'components/TextHighlight'
import { TextNull } from 'components/TextNull'

const ToggleButton = styled(sharedButton)`
  border-bottom: 1px solid transparent;
  ${({ theme }) => css`
    &:hover {
      border-bottom: 1px solid ${theme.global.colors.brand};
    }
  `}
`
export const SearchFilter = ({ facet = {}, filter }) => {
  const { isFilterChecked, toggleFilter } = useSearchManager()
  const filterLabel = getReadable(filter)
  const filterList = Object.entries(facet).sort((a, b) => b[1] - a[1])
  const filterListCount = filterList.length
  const maxCount = 5
  const isMoreThanMaxCount = filterListCount > maxCount
  const [filteredFilterList, setFilteredFilterList] = useState(
    filterList.slice(0, maxCount)
  )
  const [open, setOpen] = useState(false)
  const [userInput, setUserInput] = useState('')

  const handleToggleFilterList = (val) => {
    setUserInput(val)
    setFilteredFilterList(() =>
      // eslint-disable-next-line no-nested-ternary
      val.trim() !== ''
        ? filterList.filter((item) =>
            formatFilterName(filter, item[0])
              .toLowerCase()
              .includes(val.toLowerCase())
          )
        : open
        ? filterList
        : filterList.slice(0, maxCount)
    )
  }

  const handleToggleFilterItem = (checked, item) => {
    toggleFilter(filter, item)
    gtag.trackFilterType(filterLabel)
    gtag.trackToggleFilterItem(checked, formatFilterName(filter, item))
  }

  useEffect(() => {
    if (open && !userInput) {
      setFilteredFilterList(filterList)
    } else {
      setFilteredFilterList(filterList.slice(0, maxCount))
    }
  }, [facet, open])

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }} responsive={false}>
        {filterLabel}
      </Heading>
      {isMoreThanMaxCount && (
        <Box margin={{ bottom: 'small' }}>
          <SearchBox
            pad={{ bottom: 'xsmall' }}
            placeholder={`Filter ${filterLabel}`}
            value={userInput}
            size="small"
            onChange={handleToggleFilterList}
          />
        </Box>
      )}

      <TextHighlightContextProvider match={userInput}>
        <Box animation={open ? { type: 'fadeIn', duration: 1000 } : {}}>
          {filteredFilterList.map((item, i, arr) => (
            <Box
              key={item[0]}
              margin={{ bottom: !isLastIndex(i, arr) ? 'xsmall' : '0' }}
            >
              <CheckBox
                label={
                  <Text>
                    <TextHighlight>
                      {formatFilterName(filter, item[0])}
                    </TextHighlight>{' '}
                    ({formatNumbers(item[1])})
                  </Text>
                }
                checked={isFilterChecked(filter, item[0])}
                onChange={(e) =>
                  handleToggleFilterItem(e.target.checked, item[0])
                }
              />
            </Box>
          ))}
        </Box>
      </TextHighlightContextProvider>
      {filteredFilterList.length === 0 && <TextNull text="No match found" />}
      {isMoreThanMaxCount && (
        <ToggleButton
          label={
            // eslint-disable-next-line no-nested-ternary
            open && !userInput.trim()
              ? '- See Less'
              : !open && !userInput.trim()
              ? `+ ${filterListCount - maxCount} More`
              : ''
          }
          margin={{ top: 'xxsmall', left: 'medium' }}
          style={{
            borderRadius: '0',
            boxShadow: 'none',
            padding: '0',
            transition: 'border-bottom 0.15s ease-in'
          }}
          onClick={() => {
            setOpen(!open)
          }}
        />
      )}
    </>
  )
}

export default SearchFilter
