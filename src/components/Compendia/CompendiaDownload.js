import { useEffect, useState } from 'react'
import { useRefinebioContext } from 'hooks/useRefinebioContext'
import { useResponsive } from 'hooks/useResponsive'
import {
  Anchor,
  Box,
  CheckBox,
  Heading,
  Select as GrommetSelect,
  Text
} from 'grommet'
import { Icon } from 'components/shared/Icon'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { formatBytes } from 'helpers/formatBytes'
import { formatString } from 'helpers/formatString'
import styled from 'styled-components'
import config from 'config'
import data from 'api/mockDataCompendia'

const CustomSelect = styled(GrommetSelect)`
  padding-left: 32px;
`

export const CompendiaDownload = ({ heading, isNormalized }) => {
  const { token, setToken } = useRefinebioContext()
  const { setResponsive } = useResponsive()
  const { links } = config
  const [agree, setAgree] = useState(!!token)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState({
    result: null,
    name: ''
  })

  const clickHandle = () => {
    // TEMP
    setToken(true)
  }

  useEffect(() => {
    setOptions(() => (isNormalized ? data[0].results : data[1].results))
  }, [options])

  return (
    <Box background="white" pad={setResponsive('medium', 'large', 'xlarge')}>
      <Heading
        level={2}
        margin={{ bottom: 'medium' }}
        size={setResponsive('h2_small', 'h2_large')}
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
          style={{ position: 'absolute', left: '6px', top: '8px', zIndex: 1 }}
        >
          <Icon name="Search" size="20px" />
        </Box>
        <CustomSelect
          id="select-organism"
          label={options.map((option) =>
            formatString(option.primary_organism_name)
          )}
          options={options.map((option) =>
            formatString(option.primary_organism_name)
          )}
          value={selectedOption.primary_organism_name}
          placeholder="Search for an organism"
          onChange={({ option }) =>
            options.map(
              (o) =>
                option === formatString(o.primary_organism_name) &&
                setSelectedOption({ result: o, name: option })
            )
          }
        />
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
        <Column
          flexValue={setResponsive('1 1 auto', '1 1 auto', '1 1 0')}
          margin={{ bottom: setResponsive('small', 'small', 'none') }}
        >
          {selectedOption.result && (
            <Box animation={{ type: 'fadeIn', duration: 800 }}>
              <Text>
                Download Size:{' '}
                {formatBytes(selectedOption.result.computed_file.size_in_bytes)}
              </Text>
            </Box>
          )}
        </Column>
        <Column
          flexValue={setResponsive('1 1 auto', '1 1 auto', '1 1 0')}
          align={setResponsive('start', 'end')}
        >
          <Button
            label="Download Now"
            disabled={!agree || !selectedOption.result}
            primary
            responsive
            onClick={clickHandle}
          />
        </Column>
      </Row>
    </Box>
  )
}

export default CompendiaDownload
