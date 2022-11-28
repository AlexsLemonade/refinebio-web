import { useState, useMemo } from 'react'
import { Box, CheckBox, Heading, Text } from 'grommet'
import { Button as sharedButton } from 'components/shared/Button'
import { SearchBox } from 'components/shared/SearchBox'
import { formatString } from 'helpers/formatString'
import { scrollToId } from 'helpers/scrollToId'
import styled, { css } from 'styled-components'

const Button = styled(sharedButton)`
  border-bottom: 1px solid transparent;
  border-radius: 0;
  box-shadow: none;
  margin: 8px 0 0 14px;
  padding: 0;
  transition: border-bottom 0.3s ease-in;

  ${({ theme }) => css`
    &:hover {
      button {
        border-bottom: 1px solid ${theme.global.colors.brand};
      }
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
  const [userInput, setUserInput] = useState('')

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
    open ? filteredResult : filteredResult.slice(0, MAX_COUNT)

  return (
    <>
      <Heading level={4} margin={{ bottom: 'xsmall' }} id={label.toLowerCase()}>
        {label}
      </Heading>

      {FILTER_LENGTH > MAX_COUNT && (
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
            <CheckBox label={`${formatString(option[0])} (${option[1]})`} />
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
            open && !userInput.trim()
              ? '- see less'
              : !open && !userInput.trim()
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
