import { useEffect, useState, memo } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor, Box, CheckBox, Heading, Text } from 'grommet'
import { Icon } from 'components/shared/Icon'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { List } from 'components/shared/List'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { SearchBox } from 'components/shared/SearchBox'
import formatBytes from 'helpers/formatBytes'
import formatString from 'helpers/formatString'
import { links } from 'config'
import styled, { css } from 'styled-components'
import data from 'api/mockDataCompendia'

const boxShadow = `0px 3px 4px rgba(0, 0, 0, 0.3)`

const DropDown = styled(Box)`
  > div:nth-child(2) {
    display: none;
  }
  &:focus-within > div:nth-child(2) {
    display: block;
    box-shadow: ${boxShadow};
  }
`

const DropDownButton = styled(Button)`
  ${({ theme, selected }) => css`
    background: ${selected
      ? theme.global.colors.brand
      : theme.global.colors.white};
    &:hover,
    &:focus-visible {
      background: ${selected
        ? theme.global.colors.brand
        : theme.global.colors['gray-shade-5']};
      color: ${selected
        ? theme.global.colors.white
        : theme.global.colors.brand};
    }
  `}
`

const ListItem = ({ label, selectedOption, clickHandler }) => {
  const selected = selectedOption === label

  return (
    <Box as="li" style={{ listStyle: 'none', width: '100%' }}>
      <DropDownButton
        color={selected ? 'white' : 'black'}
        selected={selected}
        label={label}
        width="100%"
        style={{
          borderRadius: '0',
          display: 'block',
          whiteSpace: 'nowrap',
          padding: '8px 16px',
          textAlign: 'left'
        }}
        clickHandler={clickHandler}
      />
    </Box>
  )
}

export const CompendiaDownload = ({ heading, isNormalized }) => {
  const { token, setToken } = useRefinebio()
  const { setResponsive } = useResponsive()
  const [agree, setAgree] = useState(!!token)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [userInput, setUserInput] = useState('')

  const updateFilteredOptions = (val) => {
    if (val.trim() !== '') {
      setFilteredOptions(() =>
        options.filter((option) =>
          formatString(option.primary_organism_name)
            .toLowerCase()
            .startsWith(val.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(options)
    }
  }

  const handleChange = (val) => {
    if (val.trim() === '' || val !== userInput) {
      setSelectedOption(null)
    }

    setUserInput(val)
    updateFilteredOptions(val)
  }

  const handleFocus = () => {
    setShowOptions(true)
  }

  const handleClick = (option) => {
    setSelectedOption(option)
    setUserInput(formatString(option.primary_organism_name))
    setShowOptions(false)
    updateFilteredOptions(formatString(option.primary_organism_name))
  }

  const downloadCompendia = () => {
    // TEMP
    setToken(!token)
  }

  useEffect(() => {
    setOptions(() => (isNormalized ? data[0].results : data[1].results))
    setFilteredOptions(options)
  }, [options])

  return (
    <Box background="white" pad={setResponsive('medium', 'large', 'xlarge')}>
      <Heading
        level={2}
        margin={{ bottom: 'medium' }}
        size={setResponsive('small', 'large')}
      >
        Download the {heading}
      </Heading>
      <Box
        as="label"
        margin={{ bottom: 'medium' }}
        style={{ font: "22px 'Rubik', sans-serif" }}
      >
        Choose Organism
      </Box>
      <Box style={{ position: 'relative' }}>
        <Box
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            zIndex: 1
          }}
        >
          <Icon name="ChevronDown" size="xsmall" />
        </Box>
        <DropDown style={{ position: 'relative' }}>
          <SearchBox
            padding="16px 32px"
            placeholder="Search for an organism"
            size="small"
            reverse={false}
            responsive
            value={userInput}
            changeHandler={(e) => handleChange(e.target.value)}
            focusHandler={handleFocus}
          />
          {showOptions && filteredOptions.length > 0 && (
            <Box
              animation={{ type: 'zoomIn', duration: 50 }}
              background="white"
              border={{ color: 'brand', size: 'medium' }}
              margin={{ top: 'xlarge' }}
              height={{ max: '200px' }}
              width="100%"
              style={{
                overflowY: 'scroll',
                position: 'absolute',
                zIndex: 1
              }}
            >
              <List flexDirection="column">
                {filteredOptions.map((option) => (
                  <ListItem
                    key={option.primary_organism_name}
                    label={formatString(option.primary_organism_name)}
                    selectedOption={
                      selectedOption
                        ? formatString(selectedOption.primary_organism_name)
                        : null
                    }
                    clickHandler={() => handleClick(option)}
                  />
                ))}
              </List>
            </Box>
          )}
        </DropDown>
      </Box>
      {!isNormalized && (
        <Box margin={{ top: setResponsive('small', 'medium') }}>
          <InlineMessage label="Data is not normalized or aggregated." />
        </Box>
      )}
      <Box margin={{ vertical: setResponsive('small', 'medium') }}>
        <CheckBox
          label={
            <Text>
              I agree to the <Anchor href={links.terms}>Terms of Use</Anchor>
            </Text>
          }
          onClick={() => setAgree(!agree)}
        />
      </Box>
      <Row>
        <Column margin={{ bottom: setResponsive('small', 'small', 'none') }}>
          {selectedOption && (
            <Box animation={{ type: 'fadeIn', duration: 800 }}>
              <Text>
                Download Size:{' '}
                {formatBytes(selectedOption.computed_file.size_in_bytes)}
              </Text>
            </Box>
          )}
        </Column>
        <Column align={setResponsive('start', 'end')}>
          <Button
            label="Download Now"
            disabled={!agree || !selectedOption}
            primary
            responsive
            clickHandler={downloadCompendia}
          />
        </Column>
      </Row>
    </Box>
  )
}

export default memo(CompendiaDownload)
