import config from 'config'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SrOnly } from 'components/shared/SrOnly'
import styled from 'styled-components'

const PRubik = styled(Paragraph)`
  font-family: 'Rubik', sans-serif;
`
export const AboutCCDLSection = () => {
  const { viewport, setResponsive } = useResponsive()
  const { links } = config

  return (
    <FixedContainer
      border={{ color: 'gray-shade-5', side: 'top', size: 'large' }}
      pad={{
        horizontal: setResponsive('large', 'medium', 'basex15'),
        top: setResponsive('xxxlarge', 'xxxlarge', 'basex9'),
        bottom: setResponsive('xxxlarge', 'xxxlarge', 'basex12')
      }}
    >
      <Row justify="center" margin={{ bottom: 'xlarge' }}>
        <PRubik size="xlarge" textAlign="center">
          Created by the Childhood Cancer Data Lab (CCDL), powered by Alex’s
          Lemonade Stand {viewport === 'large' && <br />} Foundation, this
          endeavor is harnessing the power of big data to accelerate the pace of
          potential cures.
        </PRubik>
      </Row>
      <Row align="center" justify="center" margin={{ bottom: 'xxxlarge' }}>
        <Box
          background={{
            image: 'url(CCDL-x-ALSF.svg)',
            position: 'center',
            repeat: 'no-repeat',
            size: 'contain'
          }}
          width="453px"
          height="107px"
        >
          <SrOnly>
            Childhood Cancer Data Lab powered by Alex's Lemonade Stand
            Foundation
          </SrOnly>
        </Box>
      </Row>
      <Row
        justify={setResponsive('start', 'around')}
        elevation="xlarge"
        pad={{
          // fixed padding to preserve UI layout
          horizontal: setResponsive('medium', 'medium', '122px'),
          vertical: setResponsive('medium', 'xlarge')
        }}
        round="8px"
      >
        {/* fixed width to preserve UI layout */}
        <Box justify="center" width={setResponsive('auto', '500px')}>
          <PRubik size={setResponsive('large', 'xlarge')}>
            Donate today to support the CCDL’s efforts to give researchers the
            tools to create a healthier, more prosperous future for kids
            fighting cancer and beyond.
          </PRubik>
        </Box>
        <Box justify="center" margin={{ top: setResponsive('medium', '0') }}>
          <Button
            label="Donate Now"
            large
            href={links.donate}
            rel="noopener noreferrer"
            target="_blank"
            primary
            responsive
            uppercase
          />
        </Box>
      </Row>
    </FixedContainer>
  )
}

export default AboutCCDLSection
