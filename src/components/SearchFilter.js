import { useState, useMemo } from 'react'
import { Box, CheckBox, Heading, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchInput } from 'components/SearchInput'
import { formatFilterOption } from 'helpers/formatFilterOption'

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
      <Heading level={4} margin={{ bottom: 'xsmall' }}>
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
          <Box key={option[0]} direction="row">
            <CheckBox label={formatFilterOption(option[0])} />
            <Text margin={{ left: 'xxsmall' }}>({option[1]})</Text>
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
          onClick={() => setOpen(!open)}
        />
      )}
    </>
  )
}

export default SearchFilter
