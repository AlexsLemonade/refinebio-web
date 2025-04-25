import { useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { useToken } from 'hooks/useToken'
import formatBytes from 'helpers/formatBytes'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { CheckBox } from 'components/shared/CheckBox'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { DatasetExplore } from './DatasetExplore'

export const DatasetReady = ({ dataset }) => {
  const { downloadDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { validateToken } = useToken()
  const hasToken = validateToken()
  const [termsOfUse, setTermsOfUse] = useState(hasToken)

  const handleDownloadNow = async () => {
    await downloadDataset(dataset.id, dataset.download_url)
  }

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '70%')}>
          <Column align={setResponsive('center', 'start')}>
            <Heading level={1} margin={{ bottom: 'small' }}>
              Your Dataset is ready for download!
            </Heading>
            <Text>
              Download size: {'4.01MB' || formatBytes(dataset.size_in_bytes)}
            </Text>
            <Row
              direction={setResponsive('column', 'column', 'row')}
              width="100%"
            >
              <Row
                align={setResponsive('start', 'start', 'center')}
                direction={setResponsive('column', 'column', 'row')}
                justify="start"
                margin={{
                  top: 'medium'
                }}
                fill
              >
                {!hasToken && (
                  <CheckBox
                    label={
                      <Text>
                        I agree to the{' '}
                        <Anchor
                          href={links.terms}
                          label="Terms of Use"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      </Text>
                    }
                    onClick={() => setTermsOfUse(!termsOfUse)}
                  />
                )}
                <Box
                  margin={{
                    top: setResponsive('medium', 'small', 'none'),
                    left: hasToken
                      ? 'none'
                      : setResponsive('none', 'none', 'medium')
                  }}
                  width={setResponsive('100%', 'auto')}
                >
                  <Button
                    label="Download Now"
                    disabled={!termsOfUse}
                    primary
                    responsive
                    onClick={handleDownloadNow}
                  />
                </Box>
              </Row>
            </Row>
          </Column>
          <Column
            align="center"
            flexValue={setResponsive('1 1 auto', 'auto')}
            margin={{
              top: setResponsive('large', 'none'),
              bottom: setResponsive('large', 'none')
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
      <Box margin={{ top: setResponsive('xlarge', 'basex7', 'basex10') }}>
        <DatasetExplore dataset={dataset} />
      </Box>
    </>
  )
}

export default DatasetReady
