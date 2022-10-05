import { useState, useMemo } from 'react'
import { Box, CheckBox, Heading, Text } from 'grommet'
import { Button as sharedButton } from 'components/shared/Button'
import { SearchInput } from 'components/SearchInput'
import { formatFilterOption } from 'helpers/formatFilterOption'
import { scrollToId } from 'helpers/scrollToId'
import styled, { css } from 'styled-components'

const Button = styled(sharedButton)`
  border-bottom: 1px solid transparent;
  border-radius: 0;
  margin: 8px 24px 0;
  padding: 0;
  transition: border-bottom 0.3s ease-in;
  &:active:not([disabled]) {
    box-shadow: none;
  }
  ${({ theme }) => css`
    &:hover {
      border-bottom: 1px solid ${theme.global.colors.brand};
    }
  `}
`

export const SearchFilter = ({ filterGroup, label }) => {
  const options = useMemo(() => {
    return Object.entries(filterGroup)
  }, [filterGroup])
  const MAX_COUNT = 5
  const FILTER_LENGTH = options.length
  const [filteredResult, setfilteredResult] = useState(options)
  const [open, setOpen] = useState(false)
  const [useInput, setUserInput] = useState('')

  const filterOptions = (val) => {
    setOpen(true)
    setUserInput(val)

    if (val.trim() !== '') {
      setfilteredResult(() =>
        options.filter((option) =>
          formatFilterOption(option[0])
            .toLowerCase()
            .startsWith(val.toLowerCase())
        )
      )
    } else {
      setfilteredResult(options)
    }
  }

  const getOptionsToRender = () =>
    open ? filteredResult : filteredResult.slice(0, MAX_COUNT)

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }} id={label.toLowerCase()}>
        {label}
      </Heading>

      {FILTER_LENGTH > MAX_COUNT && (
        <SearchInput
          placeholder="Filter options"
          value={useInput}
          onChange={(e) => filterOptions(e.target.value)}
        />
      )}

      <Box style={{ animation: open ? 'fadeIn .35s' : '' }}>
        {getOptionsToRender().map((option) => (
          <Box key={option[0]} margin={{ bottom: 'xsmall' }}>
            <CheckBox
              label={`${formatFilterOption(option[0])} (${option[1]})`}
            />
          </Box>
        ))}
      </Box>

      {filteredResult.length === 0 && (
        <Text color="gray-shade-40">
          <i>No match found</i>
        </Text>
      )}

      {FILTER_LENGTH > MAX_COUNT && (
        <Button
          label={
            // eslint-disable-next-line no-nested-ternary
            open && !useInput.trim()
              ? '- see less'
              : !open && !useInput.trim()
              ? `+ ${FILTER_LENGTH - MAX_COUNT} more`
              : ''
          }
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
