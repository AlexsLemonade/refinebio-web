import { Box, Heading, Paragraph } from 'grommet'
import { useDownloadCompendium } from 'hooks/useDownloadCompendium'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import { compendia } from 'config'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'
import { Explore } from 'components/Compendia/Explore'
import formatString from 'helpers/formatString'
import { Spinner } from 'components/shared/Spinner'

export const DownloadCompendium = ({ compendium }) => {
  const { setResponsive } = useResponsive()
  const { error, downloadUrl, startFileDownload } =
    useDownloadCompendium(compendium)

  if (error) {
    return (
      <FixedContainer>
        <Error
          statusCode={error}
          align="center"
          direction="column"
          marginTop="none"
        />
      </FixedContainer>
    )
  }

  // shows Spinner until the download URL is ready
  if (!downloadUrl) return <Spinner />

  return (
    <FixedContainer>
      <Box
        align="center"
        pad={{
          top: 'large',
          bottom: 'xlarge'
        }}
      >
        <Row justify="center" width={setResponsive('100%', '70%')}>
          <Column align={setResponsive('center', 'start')}>
            <Box direction="row" gap="xxsmall" margin={{ bottom: 'small' }}>
              <Heading level={1}>
                <Icon color="success" name="Success" /> Downloading{' '}
                {formatString(compendium.primary_organism_name || '')}{' '}
                compendium...
              </Heading>
            </Box>
            <Box direction="start" gap="xsmall">
              <Paragraph>If the download did not start,</Paragraph>
              {downloadUrl && (
                <Button
                  label="click here."
                  link
                  linkFontSize="16px"
                  onClick={startFileDownload}
                />
              )}
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
      <Box>
        <Explore />
      </Box>
    </FixedContainer>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { type, organism_name: organismName } = query
  // The routes must be the valid compendia types
  if (!compendia.types.includes(type)) {
    return {
      notFound: true
    }
  }

  const compendiaQuery = {
    latest_version: true,
    limit: 1000,
    quant_sf_only: type === 'rna-seq'
  }

  const response = await api.compendia.get(compendiaQuery)

  // finds the compendium that matches organismName
  const compendium = response.results.find(
    (organism) => organism.primary_organism_name === organismName
  )

  return {
    props: {
      compendium: compendium || {},
      notFound: !compendium
    }
  }
}

export default DownloadCompendium
