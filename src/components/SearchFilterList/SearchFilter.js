/* eslint-disable no-nested-ternary */
import { useState, useMemo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Grid, Heading, Text } from 'grommet'
import { Button as sharedButton } from 'components/shared/Button'
import { SearchBox } from 'components/shared/SearchBox'
import { formatString } from 'helpers/formatString'
import { scrollToId } from 'helpers/scrollToId'
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

export const SearchFilter = ({ filterGroup, label }) => {
  const { setResponsive } = useResponsive()
  const options = useMemo(() => {
    return Object.entries(filterGroup)
  }, [filterGroup])
  const [filteredResult, setfilteredResult] = useState(options)
  const [open, setOpen] = useState(false)
  const [userInput, setUserInput] = useState('')
  const maxCount = 5
  const filterLength = options.length

  const filterOptions = (val) => {
    setUserInput(val)

    if (val.trim() !== '') {
      setfilteredResult(() =>
        options.filter((option) =>
          formatString(option[0]).toLowerCase().startsWith(val.toLowerCase())
        )
      )
    } else {
      setfilteredResult(options)
    }
  }

  const displayCount = open ? filterLength : maxCount
  const displayFilterOptions = filteredResult.slice(0, displayCount)

  return (
    <>
      <Heading
        level={4}
        margin={{ bottom: 'xsmall' }}
        id={label.toLowerCase()}
        size={setResponsive('h4_xsmall', 'medium')}
      >
        {label}
      </Heading>

      {filterLength > maxCount && (
        <SearchBox
          pad={{ bottom: 'xsmall' }}
          placeholder={`Filter ${label}`}
          value={userInput}
          size="small"
          changeHandler={(e) => filterOptions(e.target.value)}
        />
      )}

      <Grid
        margin={{ top: 'xsmall' }}
        animation={open ? { type: 'fadeIn', duration: 1000 } : {}}
        gap={{ row: 'xsmall' }}
      >
        {displayFilterOptions.map((option) => (
          <Box key={option[0]}>
            <CheckBox
              label={`${formatString(
                option[0]
              )} (${option[1].toLocaleString()})`}
            />
          </Box>
        ))}
      </Grid>

      {filteredResult.length === 0 && (
        <Text color="gray-shade-40">
          <i>No match found</i>
        </Text>
      )}

      {filterLength > maxCount && (
        <ToggleButton
          hidden={userInput.trim()}
          label={open ? '- See Less' : `+ ${filterLength - maxCount} More`}
          margin={{ top: 'xsmall', left: 'medium' }}
          style={{
            borderRadius: '0',
            boxShadow: 'none',
            padding: '0',
            transition: 'border-bottom 0.15s ease-in'
          }}
          onClick={() => {
            setOpen(!open)
            scrollToId(label.toLowerCase())
          }}
        />
      )}
    </>
  )
}

export default SearchFilter
