import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { useSearchManager } from 'hooks/useSearchManager'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import formatNumbers from 'helpers/formatNumbers'
import formatPlatformName from 'helpers/formatPlatformName'
import formatString from 'helpers/formatString'
import isLastIndex from 'helpers/isLastIndex'
import { Box, CheckBox, Heading } from 'grommet'
import { Button as sharedButton } from 'components/shared/Button'
import { SearchBox } from 'components/shared/SearchBox'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'
import styled, { css } from 'styled-components'
import cache from 'api/api_data.json'

const ToggleButton = styled(sharedButton)`
  border-bottom: 1px solid transparent;
  ${({ theme }) => css`
    &:hover {
      border-bottom: 1px solid ${theme.global.colors.brand};
    }
  `}
`
export const SearchFilter = ({ filterGroup, filterOption, filterLabel }) => {
  const { viewport } = useResponsive()
  const { isFilterChecked, toggleFilter } = useSearchManager()
  const maxCount = 5
  const filterList = Object.entries(filterGroup)
  const filterLength = filterList.length
  const [userInput, setUserInput] = useState('')
  const [open, setOpen] = useState(false)
  const filterOptions = filterList
    .filter((option) =>
      formatString(option[0]).toLowerCase().startsWith(userInput.toLowerCase())
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, open && !userInput ? filterList.length : maxCount)

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }} responsive={false}>
        {filterLabel}
      </Heading>

      {filterLength > maxCount && (
        <Box margin={{ bottom: 'small' }}>
          <SearchBox
            pad={{ bottom: 'xsmall' }}
            placeholder={`Filter ${filterLabel}`}
            value={userInput}
            size="small"
            changeHandler={(e) => setUserInput(e.target.value)}
          />
        </Box>
      )}

      <TextHighlightContextProvider match={userInput}>
        <Box animation={open ? { type: 'fadeIn', duration: 1000 } : {}}>
          {filterOptions.map((option, i, arr) => (
            <Box
              key={option[0]}
              margin={{ bottom: !isLastIndex(i, arr) ? 'xsmall' : '0' }}
            >
              <CheckBox
                label={
                  <>
                    <TextHighlight>
                      {filterOption === 'platform'
                        ? formatPlatformName(cache.platforms[option[0]])
                        : formatString(option[0])}
                    </TextHighlight>{' '}
                    ({formatNumbers(option[1])})
                  </>
                }
                checked={isFilterChecked(filterOption, option[0])}
                onChange={(e) =>
                  toggleFilter(
                    e.target.checked,
                    filterOption,
                    option[0],
                    viewport === 'large'
                  )
                }
              />
            </Box>
          ))}
        </Box>
      </TextHighlightContextProvider>

      {filterOptions.length === 0 && <TextNull text="No match found" />}

      {filterLength > maxCount && (
        <ToggleButton
          label={
            // eslint-disable-next-line no-nested-ternary
            open && !userInput.trim()
              ? '- See Less'
              : !open && !userInput.trim()
              ? `+ ${filterLength - maxCount} More`
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
