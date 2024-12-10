import { useRef, useState, memo } from 'react'
import { Box, Heading, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { useCompendiaContext } from 'hooks/useCompendiaContext'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import formatBytes from 'helpers/formatBytes'
import formatString from 'helpers/formatString'
import fuzzyFilterOnKey from 'helpers/fuzzyFilterOnKey'
import getReadable from 'helpers/getReadable'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { BoxBlock } from 'components/shared/BoxBlock'
import { Button } from 'components/shared/Button'
import { CheckBox } from 'components/shared/CheckBox'
import { Column } from 'components/shared/Column'
import { Icon } from 'components/shared/Icon'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { SearchBox } from 'components/shared/SearchBox'

const DropdownButton = styled(Button)`
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

const DropdownOption = ({ label, selected, onClick }) => (
  <DropdownButton
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
)

export const DownloadBlockForm = () => {
  const { setResponsive } = useResponsive()
  const { token, applyAcceptedTerms } = useRefinebio()
  const hasToken = !!token
  const [acceptTerms, setAcceptTerms] = useState(hasToken)
  const { compendia, type, goToDownloadCompendium } = useCompendiaContext()
  const [compendium, setCompendium] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [userInput, setUserInput] = useState('')

  const dropdownRef = useRef(null)

  const filteredOptions =
    userInput.trim() !== ''
      ? fuzzyFilterOnKey(compendia, 'primary_organism_name', userInput)
      : compendia

  const handleSelectOption = (option) => {
    setCompendium(option)
    setUserInput(formatString(option.primary_organism_name))
    setShowOptions(false)
  }

  const handleHideOptions = ({ relatedTarget }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(relatedTarget)) {
      setShowOptions(false)
    }
  }

  const handleDownloadNow = () => {
    applyAcceptedTerms() // makes sure to activate the application token
    goToDownloadCompendium(compendium)
  }

  return (
    <Box background="white" pad={setResponsive('medium', 'large', 'xlarge')}>
      <Heading
        level={2}
        margin={{ bottom: 'medium' }}
        size={setResponsive('small', 'large')}
      >
        Download the {getReadable(type)}
      </Heading>
      <Box
        as="label"
        margin={{ bottom: 'medium' }}
        style={{ font: `${setResponsive('18px', '22px')} 'Rubik', sans-serif` }}
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
        <Box onFocus={() => setShowOptions(true)} onBlur={handleHideOptions}>
          <SearchBox
            padding="16px 32px"
            placeholder="Search for an organism"
            size="small"
            reverse={false}
            responsive
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {showOptions && filteredOptions.length > 0 && (
            <Box
              ref={dropdownRef}
              animation={{ type: 'zoomIn', duration: 50 }}
              as="label"
              background="white"
              border={{ color: 'brand', size: 'medium' }}
              elevation="xlarge"
              margin={{ top: '36px' }}
              height={{ max: '200px' }}
              width="100%"
              style={{
                display: showOptions ? 'block' : 'none',
                overflowY: 'scroll',
                position: 'absolute',
                zIndex: 1
              }}
            >
              <BoxBlock>
                {filteredOptions.map((option) => (
                  <DropdownOption
                    key={option.primary_organism_name}
                    label={formatString(option.primary_organism_name)}
                    selected={
                      option.primary_organism_name ===
                      compendium?.primary_organism_name
                    }
                    onClick={() => handleSelectOption(option)}
                  />
                ))}
              </BoxBlock>
            </Box>
          )}
        </Box>
      </Box>
      {type === 'rna-seq' && (
        <Box margin={{ top: setResponsive('small', 'medium') }}>
          <InlineMessage label="Data is not normalized or aggregated." />
        </Box>
      )}
      {compendium?.organism_names?.length > 1 && (
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
      {!hasToken && (
        <Box margin={{ vertical: 'small' }}>
          <CheckBox
            label={
              <Text>
                I agree to the{' '}
                <Anchor href={links.terms_of_use}>Terms of Use</Anchor>
              </Text>
            }
            onClick={() => setAcceptTerms(!acceptTerms)}
          />
        </Box>
      )}
      <Row margin={{ top: 'small' }}>
        <Column margin={{ bottom: setResponsive('small', 'small', 'none') }}>
          {compendium && (
            <Box animation={{ type: 'fadeIn', duration: 800 }}>
              <Text>
                Download Size:{' '}
                {formatBytes(compendium.computed_file.size_in_bytes)}
              </Text>
            </Box>
          )}
        </Column>
        <Column align={setResponsive('start', 'end')}>
          <Button
            label="Download Now"
            disabled={!acceptTerms || !compendium}
            primary
            responsive
            onClick={handleDownloadNow}
          />
        </Column>
      </Row>
    </Box>
  )
}

export default memo(DownloadBlockForm)
