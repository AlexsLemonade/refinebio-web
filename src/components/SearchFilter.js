import { useState, useMemo } from 'react'
import { Box, CheckBox, Heading, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchInput } from 'components/SearchInput'
import { formatFilterOption } from 'helpers/formatFilterOption'

export const SearchFilter = ({ filterGroup, label }) => {
  const MAX_COUNT = 5
  const options = useMemo(() => {
    return Object.entries(filterGroup)
  }, [])

  const FILTER_LENGTH = options.length

  const [filterdResult, setFilterdResult] = useState(options)
  const [open, setOpen] = useState(false)

  const filterOptions = (val) => {
    setOpen(true)

    if (val.trim() !== '') {
      setFilterdResult(() =>
        options.filter((option) =>
          formatFilterOption(option[0])
            .toLowerCase()
            .includes(val.toLowerCase())
        )
      )
    } else {
      setFilterdResult(options)
    }
  }

  const getOptionsToRender = () =>
    open ? filterdResult : filterdResult.slice(0, MAX_COUNT)

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }}>
        {label}
      </Heading>

      {FILTER_LENGTH > MAX_COUNT && (
        <SearchInput
          placeholder="Filter options"
          onChange={(e) => filterOptions(e.target.value)}
        />
      )}

      {getOptionsToRender().map((option) => (
        <Box key={option[0]} direction="row">
          <CheckBox label={formatFilterOption(option[0])} />
          <Text margin={{ left: 'xxsmall' }}>({option[1]})</Text>
        </Box>
      ))}

      {FILTER_LENGTH > MAX_COUNT && (
        <Button
          label={open ? '- see less' : `+ ${FILTER_LENGTH - MAX_COUNT} more`}
          onClick={() => setOpen(!open)}
        />
      )}
    </>
  )
}

export default SearchFilter
