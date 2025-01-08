import { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import formatBytes from 'helpers/formatBytes'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { CheckBox } from 'components/shared/CheckBox'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { DatasetExplore } from './DatasetExplore'

export const DatasetReady = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const { downloadDataset } = useDatasetManager()
  const { acceptedTerms, setAcceptedTerms } = useRefinebio()
  const [isTermsChecked, setIsTermsChecked] = useState(acceptedTerms)
  const [submitted, setSubmitted] = useState(false)

  const download = async () => {
    await downloadDataset(dataset.id)
    gtag.trackDatasetDownload(dataset)
  }

  useEffect(() => {
    if (submitted) {
      setAcceptedTerms(isTermsChecked)
      if (acceptedTerms) download()
    }
  }, [acceptedTerms, submitted])

  return (
    <>
      <Box align="center">
        <Row justify="center" width={setResponsive('100%', '80%')}>
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
                  top: 'small'
                }}
                fill
              >
                {!acceptedTerms && (
                  <Column align={setResponsive('center', 'start')}>
                    <CheckBox
                      label={
                        <Text>
                          I agree to the{' '}
                          <Anchor
                            label="Terms of Use"
                            href={links.terms_of_use}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </Text>
                      }
                      onClick={() => setIsTermsChecked(!isTermsChecked)}
                    />
                  </Column>
                )}
                <Column
                  align={setResponsive('center', 'start')}
                  margin={{
                    top: setResponsive('medium', 'small', 'none'),
                    left: acceptedTerms
                      ? 'none'
                      : setResponsive('none', 'none', 'medium')
                  }}
                >
                  <Button
                    label="Download Now"
                    disabled={!isTermsChecked}
                    primary
                    responsive
                    onClick={() => setSubmitted(true)}
                  />
                </Column>
              </Row>
            </Row>
          </Column>
          <Column
            align="center"
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
