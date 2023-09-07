import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { links } from 'config'

export const DatasetErrorDownloading = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center">
      <Row justify="center" width={setResponsive('100%', '60%')}>
        <Column
          align={setResponsive('center', 'start')}
          flexValue={setResponsive('1 1 auto', 'auto')}
        >
          <Heading level={1} margin={{ bottom: 'small' }}>
            Uh-oh something went wrong!
          </Heading>
          <Paragraph>
            If the problem persists, please contact{' '}
            <Anchor
              label="requests@ccdatalab.org"
              href={`mailto:${links.email_request}`}
            />
            {!dataset?.failure_reason && '.'}
            {dataset?.failure_reason && (
              <>
                {' '}
                ,or{' '}
                <Anchor
                  href={links.refinebio_github_repo_new_issue}
                  label="file a ticket on Github"
                  rel="noopener noreferrer"
                  target="_blank"
                />{' '}
                with the following error message for further assistance.
              </>
            )}
          </Paragraph>
          {dataset?.failure_reason && (
            <Paragraph color="error">
              Error details: {dataset?.failure_reason}
            </Paragraph>
          )}
          <Box
            margin={{
              top: setResponsive('medium', 'small')
            }}
            width={setResponsive('100%', 'auto')}
          >
            <Box
              direction={setResponsive('column', 'column', 'row')}
              justify="start"
              margin={{ top: 'small' }}
            />
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
              image: "url('/illustration-dataset-error.svg')",
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

export default DatasetErrorDownloading
