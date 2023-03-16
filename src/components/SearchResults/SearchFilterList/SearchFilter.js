import { useState, useMemo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { formatString } from 'helpers/formatString'
import { isLastIndex } from 'helpers/isLastIndex'
import { scrollToId } from 'helpers/scrollToId'
import { Box, CheckBox, Heading } from 'grommet'
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
`
export const SearchFilter = ({
  checked,
  filter,
  filterGroup,
  filterParam,
  label,
  setChecked,
  setFilter
}) => {
  const { setResponsive } = useResponsive()
  const maxCount = 5
  const options = useMemo(() => {
    return Object.entries(filterGroup)
  }, [filterGroup])
  const filterLength = options.length
  const [filteredResult, setfilteredResult] = useState(options)
  const [open, setOpen] = useState(false)
  const [userInput, setUserInput] = useState('')

  const toggleCheckBox = (e, val) => {
    if (e.target.checked) {
      setChecked([...checked, val])
    } else {
      setChecked(checked.filter((item) => item !== val))
    }
  }

  const toggleFilter = (e, val) => {
    if (e.target.checked) {
      setFilter(() => {
        const temp = { ...filter }
        if (temp[filterParam] !== undefined) {
          temp[filterParam].push(val)
        } else {
          temp[filterParam] = [val]
        }

        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

        if (temp[filterParam].length > 0) {
          temp[filterParam] = temp[filterParam].filter((item) => item !== val)
          if (temp[filterParam].length === 0) delete temp[filterParam]
        }

        return { ...temp }
      })
    }
  }

  const handleToggle = (e, val) => {
    toggleCheckBox(e, val)
    toggleFilter(e, val)
  }

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

      <Box
        margin={{ top: 'xsmall' }}
        animation={open ? { type: 'fadeIn', duration: 1000 } : {}}
      >
        {getOptionsToRender().map((option, i, arr) => (
          <Box
            key={option[0]}
            margin={{ bottom: !isLastIndex(i, arr) ? 'xsmall' : '0' }}
          >
            <CheckBox
              label={`${formatString(option[0])} (${formatNumbers(option[1])})`}
              checked={checked.includes(option[0])}
              onChange={(e) => handleToggle(e, option[0])}
            />
          </Box>
        ))}
      </Box>

      {filteredResult.length === 0 && <TextNull text="No match found" />}

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
