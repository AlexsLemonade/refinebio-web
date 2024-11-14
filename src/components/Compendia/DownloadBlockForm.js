import { useState, memo } from 'react'
import { Box, Heading, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { useCompendia } from 'hooks/useCompendia'
import { links, options } from 'config'
import { useResponsive } from 'hooks/useResponsive'
import { useToken } from 'hooks/useToken'
import formatBytes from 'helpers/formatBytes'
import formatString from 'helpers/formatString'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { CheckBox } from 'components/shared/CheckBox'
import { Column } from 'components/shared/Column'
import { List } from 'components/shared/List'
import { Icon } from 'components/shared/Icon'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { SearchBox } from 'components/shared/SearchBox'

const DropDown = styled(Box)`
  > div:nth-child(2) {
    display: none;
  }
  &:focus-within > div:nth-child(2) {
    display: block;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
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

const ListItem = ({ label, selectedOrganism, onClick }) => {
  const selected = selectedOrganism === label

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
        onClick={onClick}
      />
    </Box>
  )
}

export const DownloadBlockForm = () => {
  // TODO: Clean up options.compendia after PR #402 is merged
  const {
    compendia: { heading }
  } = options

  const { setResponsive } = useResponsive()
  const { compendia, type, navigateToDownload } = useCompendia()
  const compendiaOptions = compendia.results
  // TODO: Temporarily added - Token validation flow will be changed in a future issue
  const { validateToken } = useToken()
  const hasToken = validateToken()
  const [acceptTerms, setAcceptTerms] = useState(hasToken)
  const [filteredOptions, setFilteredOptions] = useState([...compendiaOptions])
  const [selectedOrganism, setSelectedOrganism] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [userInput, setUserInput] = useState('')

  const handleChangeSelectedOption = (val) => {
    if (val.trim() === '' || val !== userInput) {
      setSelectedOrganism(null)
    }

    setUserInput(val)
    updateFilteredOptions(val)
  }

  const handleClickSelectedOption = (option) => {
    setSelectedOrganism(option)
    setUserInput(formatString(option.primary_organism_name))
    setShowOptions(false)
    updateFilteredOptions(formatString(option.primary_organism_name))
  }

  const updateFilteredOptions = (val) => {
    if (val.trim() !== '') {
      setFilteredOptions(() =>
        compendiaOptions.filter((organism) =>
          formatString(organism.primary_organism_name)
            .toLowerCase()
            .includes(val.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(compendiaOptions)
    }
  }

  return (
    <Box background="white" pad={setResponsive('medium', 'large', 'xlarge')}>
      <Heading
        level={2}
        margin={{ bottom: 'medium' }}
        size={setResponsive('small', 'large')}
      >
        Download the {heading[type]}
      </Heading>
      <Box
        as="label"
        margin={{ bottom: 'medium' }}
        style={{
          font: `${setResponsive('18px', '22px')} 'Rubik', sans-serif`
        }}
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
            onChange={(e) => handleChangeSelectedOption(e.target.value)}
            onFocus={() => setShowOptions(true)}
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
                    selectedOrganism={
                      selectedOrganism
                        ? formatString(selectedOrganism.primary_organism_name)
                        : null
                    }
                    onClick={() => handleClickSelectedOption(option)}
                  />
                ))}
              </List>
            </Box>
          )}
        </DropDown>
      </Box>
      {type === 'rna-seq' && (
        <Box margin={{ top: setResponsive('small', 'medium') }}>
          <InlineMessage label="Data is not normalized or aggregated." />
        </Box>
      )}
      {selectedOrganism?.organism_names?.length > 1 && (
        <Box margin={{ top: 'large' }}>
          <InlineMessage
            label={
              <Text margin={{ left: 'small' }} style={{ display: 'block' }}>
                Also contains small number of samples from other organisms from
                the same species.{' '}
                <Anchor
                  href={links.refinebio_docs_collapsing_by_genus}
                  label="View"
                  rel="noopener noreferrer"
                />
              </Text>
            }
          />
        </Box>
      )}
      <Box margin={{ vertical: setResponsive('small', 'medium') }}>
        {!hasToken && (
          <CheckBox
            label={
              <Text>
                I agree to the{' '}
                <Anchor href={links.terms_of_use}>Terms of Use</Anchor>
              </Text>
            }
            onClick={() => setAcceptTerms(!acceptTerms)}
          />
        )}
      </Box>
      <Row>
        <Column margin={{ bottom: setResponsive('small', 'small', 'none') }}>
          {selectedOrganism && (
            <Box animation={{ type: 'fadeIn', duration: 800 }}>
              <Text>
                Download Size:{' '}
                {formatBytes(selectedOrganism.computed_file.size_in_bytes)}
              </Text>
            </Box>
          )}
        </Column>
        <Column align={setResponsive('start', 'end')}>
          <Button
            label="Download Now"
            disabled={!acceptTerms || !selectedOrganism}
            primary
            responsive
            onClick={() => navigateToDownload(selectedOrganism)}
          />
        </Column>
      </Row>
    </Box>
  )
}

export default memo(DownloadBlockForm)
