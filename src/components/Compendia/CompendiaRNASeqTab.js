import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'

const Card = ({ heading, pad, children }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      flexValue={setResponsive('1 1 auto', '1 1 auto', '1 1 0')}
      margin={{
        top: setResponsive('xlarge', 'basex6')
      }}
      pad={pad}
    >
      <Heading
        level={2}
        margin={{ bottom: setResponsive('small', 'small', 'medium') }}
        size="h2_small"
      >
        {heading}
      </Heading>
      {children}
    </Column>
  )
}

export const CompendiaRNASeqTab = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box>
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
              All RNA-seq samples are uniformly processed using Salmon and the
              output quant.sf files are zipped together.
            </Paragraph>
            <Paragraph>
              Note: This compendia is not normalized or aggregated.
            </Paragraph>
            <Button
              label="Learn More"
              margin={{ top: 'small' }}
              secondary
              responsive
            />
          </Card>
          <Card
            heading="Customize your download"
            pad={{ left: setResponsive('none', 'none', 'basex10') }}
          >
            <Paragraph>
              Choose the quant.sf files by experiment or samples using our API.
            </Paragraph>
            <Button
              label="Read the Docs"
              margin={{ top: 'small' }}
              secondary
              responsive
            />
          </Card>
        </Row>
      </FixedContainer>
    </Box>
  )
}

export default CompendiaRNASeqTab
