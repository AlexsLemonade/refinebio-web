import { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { useResponsive } from 'hooks/useResponsive'
import { useSearchManager } from 'hooks/useSearchManager'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import formatFilterName from 'helpers/formatFilterName'
import formatNumbers from 'helpers/formatNumbers'
import isLastIndex from 'helpers/isLastIndex'
import { Button as sharedButton } from 'components/shared/Button'
import { CheckBox } from 'components/shared/CheckBox'
import { SearchBox } from 'components/shared/SearchBox'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

const ToggleButton = styled(sharedButton)`
  border-bottom: 1px solid transparent;
  ${({ theme }) => css`
    &:hover {
      border-bottom: 1px solid ${theme.global.colors.brand};
    }
  `}
`
export const SearchFilter = ({
  filterGroup,
  filterLabel,
  filterOption,
  filterKey
}) => {
  const { viewport } = useResponsive()
  const { isFilterChecked, toggleFilter } = useSearchManager()
  const filterList = Object.entries(filterGroup).sort((a, b) => b[1] - a[1])
  const filterListCount = filterList.length
  const maxCount = 5
  const isMoreThanMaxCount = filterListCount > maxCount
  const [filteredResults, setFilteredResults] = useState(
    filterList.slice(0, maxCount)
  )
  const [open, setOpen] = useState(false)
  const [userInput, setUserInput] = useState('')

  const handleToggleFilterList = (val) => {
    setUserInput(val)
    setFilteredResults(() =>
      // eslint-disable-next-line no-nested-ternary
      val.trim() !== ''
        ? filterList.filter((option) =>
            formatFilterName(filterOption, option[0])
              .toLowerCase()
              .includes(val.toLowerCase())
          )
        : open
        ? filterList
        : filterList.slice(0, maxCount)
    )
  }

  useEffect(() => {
    if (open && !userInput) {
      setFilteredResults(filterList)
    } else {
      setFilteredResults(filterList.slice(0, maxCount))
    }
  }, [filterGroup, open])

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
            onChange={(e) => handleToggleFilterList(e.target.value)}
          />
        </Box>
      )}

      <TextHighlightContextProvider match={userInput}>
        <Box animation={open ? { type: 'fadeIn', duration: 1000 } : {}}>
          {filteredResults.map((option, i, arr) => (
            <Box
              key={option[0]}
              margin={{ bottom: !isLastIndex(i, arr) ? 'xsmall' : '0' }}
            >
              <CheckBox
                label={
                  <Text>
                    <TextHighlight>
                      {formatFilterName(filterOption, option[0])}
                    </TextHighlight>{' '}
                    ({formatNumbers(option[1])})
                  </Text>
                }
                checked={isFilterChecked(filterOption, option[0])}
                onChange={(e) =>
                  toggleFilter(
                    e.target.checked,
                    filterOption,
                    filterKey,
                    option[0],
                    viewport === 'large'
                  )
                }
              />
            </Box>
          ))}
        </Box>
      </TextHighlightContextProvider>
      {filteredResults.length === 0 && <TextNull text="No match found" />}
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
