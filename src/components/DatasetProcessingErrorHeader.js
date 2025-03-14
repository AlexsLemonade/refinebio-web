import { Box, Heading, Paragraph, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/Anchor'
import { Column } from 'components/Column'
import { Row } from 'components/Row'
import { links } from 'config'

export const DatasetProcessingErrorHeader = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center">
      <Row justify="center" width={setResponsive('100%', '70%')}>
        <Column align={setResponsive('center', 'start')}>
          <Heading level={1} margin={{ bottom: 'small' }}>
            Uh-oh something went wrong!
          </Heading>
          <Paragraph>
            We encountered a problem while getting your dataset ready. We
            apologize for the inconvenience.
          </Paragraph>
          <Paragraph>
            Please contact{' '}
            <Anchor
              label={links.email_request_ccdl}
              href={`mailto:${links.email_request_ccdl}`}
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
            <Box
              background="gray-shade-5"
              margin={{ top: 'small' }}
              pad="small"
            >
              <Text color="error" weight="bold">
                {dataset.failure_reason}
              </Text>
            </Box>
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
          margin={{
            top: setResponsive('large', 'none'),
            bottom: setResponsive('large', 'none')
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

export default DatasetProcessingErrorHeader
