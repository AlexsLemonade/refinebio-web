/* eslint-disable no-nested-ternary */
import { useState, useMemo } from 'react'
import { useSearch } from 'hooks/useSearch'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import { isChecked } from 'helpers/search'
import { Box, CheckBox, Grid, Heading } from 'grommet'
import { Button as sharedButton } from 'components/shared/Button'
import { SearchBox } from 'components/shared/SearchBox'
import { TextNull } from 'components/shared/TextNull'
import styled, { css } from 'styled-components'

const ToggleButton = styled(sharedButton)`
  border-bottom: 1px solid transparent;
  ${({ theme }) => css`
    &:hover {
      border-bottom: 1px solid ${theme.global.colors.brand};
    }
  `}

  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
    `}
`
export const SearchFilter = ({ filterGroup, filterParam, filterLabel }) => {
  const { filter, toggleFilter } = useSearch()
  const maxCount = 5
  const options = useMemo(() => {
    return Object.entries(filterGroup)
  }, [filterGroup])
  const filterLength = options.length
  const [userInput, setUserInput] = useState('')
  const [openOptions, setOpenOptions] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  const handleFilterOptions = (val) => {
    setUserInput(val)

    if (val.trim() !== '') {
      setFilteredOptions(() =>
        options.filter((option) =>
          formatString(option[0]).toLowerCase().startsWith(val.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(options)
    }
  }

  const displayCount = openOptions ? filterLength : maxCount
  const displayFilterOptions = filteredOptions.slice(0, displayCount)

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }} responsive={false}>
        {filterLabel}
      </Heading>

      {filterLength > maxCount && (
        <SearchBox
          pad={{ bottom: 'xsmall' }}
          placeholder={`Filter ${filterLabel}`}
          value={userInput}
          size="small"
          changeHandler={(e) => handleFilterOptions(e.target.value)}
        />
      )}

      <Grid margin={{ top: 'xsmall' }} gap={{ row: 'xsmall' }}>
        {displayFilterOptions.map((option) => (
          <Box
            key={option[0]}
            animation={openOptions ? { type: 'fadeIn', duration: 1000 } : {}}
          >
            <CheckBox
              label={`${formatString(option[0])} (${formatNumbers(option[1])})`}
              checked={isChecked(filter, filterParam, option[0])}
              onChange={(e) => toggleFilter(e, filterParam, option[0])}
            />
          </Box>
        ))}
      </Grid>

      {filteredOptions.length === 0 && <TextNull text="No match found" />}

      {filterLength > maxCount && (
        <ToggleButton
          hidden={userInput.trim()}
          label={
            openOptions ? '- See Less' : `+ ${filterLength - maxCount} More`
          }
          margin={{ top: 'xsmall', left: 'medium' }}
          style={{
            borderRadius: '0',
            boxShadow: 'none',
            padding: '0',
            transition: 'border-bottom 0.15s ease-in'
          }}
          onClick={() => {
            setOpenOptions(!openOptions)
          }}
        />
      )}
    </>
  )
}

export default SearchFilter
