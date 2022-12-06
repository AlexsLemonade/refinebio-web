import { useState, useMemo } from 'react'
import { Box, CheckBox, Heading, Text } from 'grommet'
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
`

export const SearchFilter = ({ filterGroup, label }) => {
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

  const getOptionsToRender = () =>
    open ? filteredResult : filteredResult.slice(0, maxCount)

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }} id={label.toLowerCase()}>
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

      <Box
        margin={{ top: 'xsmall' }}
        animation={open ? { type: 'fadeIn', duration: 1000 } : {}}
      >
        {getOptionsToRender().map((option, i, arr) => (
          <Box
            key={option[0]}
            margin={{ bottom: i !== arr.length - 1 ? 'xsmall' : '0' }}
          >
            <CheckBox
              label={`${formatString(
                option[0]
              )} (${option[1].toLocaleString()})`}
            />
          </Box>
        ))}
      </Box>

      {filteredResult.length === 0 && (
        <Text color="gray-shade-40">
          <i>No match found</i>
        </Text>
      )}

      {filterLength > maxCount && (
        <ToggleButton
          label={
            // eslint-disable-next-line no-nested-ternary
            open && !userInput.trim()
              ? '- see less'
              : !open && !userInput.trim()
              ? `+ ${filterLength - maxCount} more`
              : ''
          }
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
