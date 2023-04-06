import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { CompendiaDownloadBlock } from './CompendiaDownloadBlock'

const Card = ({ heading, pad, children }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      flexValue={setResponsive('1 1 auto', '1 1 auto', '1 1 0')}
      margin={{
        top: setResponsive('xlarge', 'basex6')
      }}
      pad={pad}
      width="100%"
    >
      <Heading
        level={2}
        margin={{ bottom: setResponsive('small', 'small', 'medium') }}
      >
        {heading}
      </Heading>
      {children}
    </Column>
  )
}

export const CompendiaRNASeqTab = ({ type }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box animation={{ type: 'fadeIn', duration: 350, delay: 200 }}>
      <CompendiaDownloadBlock type={type} />
      <FixedContainer>
        <Row
          direction={setResponsive('column', 'column', 'row')}
          pad={{ bottom: setResponsive('xlarge', 'basex6') }}
        >
          <Card
            heading=" Uniformly Processed"
            pad={{ right: setResponsive('none', 'none', 'basex10') }}
          >
            <Box
              background={{
                image: 'url(/rna-compedia-pipeline.svg)',
                position: 'top left',
                repeat: 'no-repeat',
                size: '100%'
              }}
              height="62px"
              width="300px"
              margin={{ bottom: 'small' }}
            />
            <Paragraph
              margin={{ bottom: setResponsive('xsmall', 'xsmall', 'large') }}
            >
              All RNA-seq samples are uniformly processed using{' '}
              <Anchor
                href={links.salmon}
                label="Salmon"
                rel="noopener noreferrer"
                target="_blank"
              />{' '}
              and the output{' '}
              <Text color="coral-shade-20" style={{ background: '#f2f2f2' }}>
                quant.sf
              </Text>{' '}
              files are zipped together.
            </Paragraph>
            <Paragraph>
              Note: This compendia is not normalized or aggregated.
            </Paragraph>
            <Button
              aria-label="Go to refinebio docs - RNA-seq Sample Compendia"
              href={links.refinebio_docs_rna_seq_sample_compendia}
              label="Learn More"
              margin={{ top: 'small' }}
              secondary
              responsive
              rel="noopener noreferrer"
              target="_blank"
            />
          </Card>
          <Card
            heading="Customize your download"
            pad={{ left: setResponsive('none', 'none', 'basex10') }}
          >
            <Paragraph>
              Choose the{' '}
              <Text color="coral-shade-20" style={{ background: '#f2f2f2' }}>
                quant.sf
              </Text>{' '}
              files by experiment or samples using our API.
            </Paragraph>
            <Button
              aria-label="Go to refinebio API docs"
              href={links.refinebio_api_docs}
              label="Read the Docs"
              margin={{ top: 'small' }}
              secondary
              responsive
              rel="noopener noreferrer"
              target="_blank"
            />
          </Card>
        </Row>
      </FixedContainer>
    </Box>
  )
}

export default memo(CompendiaRNASeqTab)
