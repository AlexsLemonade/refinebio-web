import { useState } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import { formatBytes } from 'helpers/formatBytes'
import { Box, CheckBox, Heading, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { DatasetExplore } from './DatasetExplore'

export const DatasetReady = ({ dataset }) => {
  const { token, setToken } = useRefinebio()
  const { setResponsive } = useResponsive()

  const [agree, setAgree] = useState(!!token)

  const handleAgreeToTerms = () => {
    setAgree(true)
    setToken(true)
  }

  const handleDownloadNow = () => {
    // TEMP
  }

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '70%')}>
          <Column
            align={setResponsive('center', 'start')}
            flexValue={setResponsive('1 1 auto', 'auto')}
          >
            <Heading
              level={2}
              margin={{ bottom: 'small' }}
              size={setResponsive('h2_small', 'h2_large')}
            >
              Your Dataset is ready for download!
            </Heading>
            <Text>
              Download size: {'4.01 MB' || formatBytes(dataset.size_in_bytes)}
            </Text>
            <Row
              direction={setResponsive('column', 'column', 'row')}
              width="100%"
            >
              <Box
                margin={{
                  top: setResponsive('medium', 'small', 'none')
                }}
              >
                <CheckBox
                  label={
                    <Text>
                      I agree to the{' '}
                      <Anchor href={links.terms} label="Terms of Use  " />
                    </Text>
                  }
                  onClick={handleAgreeToTerms}
                />
              </Box>
              <Box
                margin={{
                  top: setResponsive('medium', 'small', 'none'),
                  left: setResponsive('none', 'none', 'medium')
                }}
                width={setResponsive('100%', 'auto')}
              >
                <Button
                  label="Download Now"
                  disabled={!agree || !token}
                  primary
                  responsive
                  clickHandler={handleDownloadNow}
                />
              </Box>
            </Row>
          </Column>
          <Column
            align="center"
            flexValue={setResponsive('1 1 auto', 'auto')}
            margin={{
              top: setResponsive('large', 'none'),
              bottom: setResponsive('large', 'none'),
              left: setResponsive('none', 'medium', 'basex13')
            }}
          >
            <Box
              aria-hidden
              background={{
                image: "url('/illustration-dataset.svg')",
                position: 'center',
                repeat: 'no-repeat',
                size: 'contain'
              }}
              // to preserve the dimension of SVG image
              height={setResponsive('169px', '169px', '169px')}
              width={setResponsive('250px', '210px')}
            />
          </Column>
        </Row>
      </Box>
      <Box margin={{ top: setResponsive('xlarge', 'basex7', 'basex13') }}>
        <DatasetExplore dataset={dataset} />
      </Box>
    </>
  )
}

export default DatasetReady