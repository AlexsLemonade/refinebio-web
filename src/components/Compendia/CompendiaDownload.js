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
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import styled from 'styled-components'

const CustomSelect = styled(GrommetSelect)`
  padding-left: 32px;
`

export const CompendiaDownload = ({ heading, isNormalized }) => {
  const { token, setToken } = useRefinebioContext()
  const { setResponsive } = useResponsive()
  const [agree, setAgree] = useState(!!token)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')

  const clickHandle = () => {
    // TEMP
    setToken(true)
  }

  useEffect(() => {
    setOptions(() =>
      isNormalized ? ['One', 'Two', 'Three'] : ['Four', 'Five', 'Six']
    )
  }, [])

  useEffect(() => {}, [selectedOption])

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
          options={options}
          value={selectedOption}
          placeholder="Search for an organism"
          onChange={({ option }) => setSelectedOption(option)}
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
              I agree to the <Anchor href="#url">Terms of Use</Anchor>
            </Text>
          }
          onClick={() => setAgree(!agree)}
        />
      </Box>
      <Row>
        <Box margin={{ bottom: setResponsive('small', 'small', 'none') }}>
          {selectedOption !== '' && (
            <Box animation={{ type: 'fadeIn', duration: 800 }}>
              <Text>Download Size: 65.91 MB</Text>
            </Box>
          )}
        </Box>
        <Box align={setResponsive('start', 'end')}>
          <Button
            label="Download Now"
            disabled={!agree || selectedOption === ''}
            primary
            responsive
            onClick={clickHandle}
          />
        </Box>
      </Row>
    </Box>
  )
}

export default CompendiaDownload
