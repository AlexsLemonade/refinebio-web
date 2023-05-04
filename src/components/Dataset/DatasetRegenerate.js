import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { links } from 'config'

export const DatasetRegenerate = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center">
      <Row justify="center" width={setResponsive('100%', '70%')}>
        <Column align={setResponsive('center', 'start')}>
          <Heading
            level={1}
            margin={{ bottom: 'small' }}
            size={setResponsive('h1Xsmall', 'h1Small')}
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
            <Button label="Regenerate Files" primary responsive />
            <Box margin={{ top: 'small' }}>
              <InlineMessage
                color="info"
                fontSize="medium"
                margin={{
                  right: 'xsmall',
                  bottom: setResponsive('xsmall', 'xsmall', 'none')
                }}
                label={
                  <>
                    Some expression values may differ.{' '}
                    <Anchor
                      href={links.refinebio_docs_why_expression_values_differ}
                      label="Learn Why"
                      rel="noopener noreferrer"
                    />
                  </>
                }
                name="Info"
              />
            </Box>
          </Box>
        </Column>
        <Column
          align="center"
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
  )
}

export default DatasetRegenerate
