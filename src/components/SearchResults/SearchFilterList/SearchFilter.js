import { useState, useMemo } from 'react'
import { useFilter } from 'hooks/useFilter'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { formatString } from 'helpers/formatString'
import { isChecked } from 'helpers/search'
import { isLastIndex } from 'helpers/isLastIndex'
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
export const SearchFilter = ({ filterGroup, filterParam, filterLabel }) => {
  const { filter, toggleFilter } = useFilter()
  const { setResponsive } = useResponsive()
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

  const getOptions = () =>
    openOptions ? filteredOptions : filteredOptions.slice(0, maxCount)

  return (
    <>
      <Heading
        level={4}
        margin={{ bottom: 'xsmall' }}
        id={filterLabel.toLowerCase()}
        size={setResponsive('h4_xsmall', 'medium')}
      >
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

      <Box
        margin={{ top: 'xsmall' }}
        animation={openOptions ? { type: 'fadeIn', duration: 1000 } : {}}
      >
        {getOptions().map((option, i, arr) => (
          <Box
            key={option[0]}
            margin={{ bottom: !isLastIndex(i, arr) ? 'xsmall' : '0' }}
          >
            <CheckBox
              label={`${formatString(option[0])} (${formatNumbers(option[1])})`}
              checked={isChecked(filter, filterParam, option[0])}
              onChange={(e) => toggleFilter(e, filterParam, option[0])}
            />
          </Box>
        ))}
      </Box>

      {filteredOptions.length === 0 && <TextNull text="No match found" />}

      {filterLength > maxCount && (
        <ToggleButton
          label={
            // eslint-disable-next-line no-nested-ternary
            openOptions && !userInput.trim()
              ? '- See Less'
              : !openOptions && !userInput.trim()
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
            setOpenOptions(!openOptions)
          }}
        />
      )}
    </>
  )
}

export default SearchFilter
