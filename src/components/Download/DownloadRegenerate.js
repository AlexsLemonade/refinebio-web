import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { DownloadFolterCTA } from './DownloadFooterCTA'

// eslint-disable-next-line no-unused-vars
export const DownloadRegenerate = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  const handleRegenerateFiles = () => {
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
              Download Expired!
            </Heading>
            <Paragraph>
              The download files for this dataset isn&#39;t available anymore.
            </Paragraph>
            <Box
              margin={{
                top: setResponsive('medium', 'small')
              }}
              width={setResponsive('100%', 'auto')}
            >
              <Button
                label="Regenerate Files"
                primary
                responsive
                clickHandler={handleRegenerateFiles}
              />
              <Box
                direction={setResponsive('column', 'column', 'row')}
                justify="start"
                margin={{ top: 'small' }}
              >
                <InlineMessage
                  color="info"
                  fontSize="medium"
                  margin={{
                    right: 'xsmall',
                    bottom: setResponsive('xsmall', 'xsmall', 'none')
                  }}
                  label="Some expression values may differ."
                  name="Info"
                />
                <Anchor
                  href={links.refinebio_docs_why_expression_values_differ}
                  label="Learn Why"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Box>
            </Box>
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
                image: "url('illustration-dataset.svg')",
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
        <DownloadFolterCTA />
      </Box>
    </>
  )
}

export default DownloadRegenerate
