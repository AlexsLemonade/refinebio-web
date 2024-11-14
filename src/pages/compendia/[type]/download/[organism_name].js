import { useEffect, useState } from 'react'
import { Box, Heading, Paragraph } from 'grommet'
import { useCompendia } from 'hooks/useCompendia'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import gtag from 'analytics/gtag'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'
import { Explore } from 'components/Compendia/Explore'
import formatString from 'helpers/formatString'

export const DownloadFile = ({ compendia: compendiaProp }) => {
  const { setResponsive } = useResponsive()
  const { error, compendium } = useCompendia(compendiaProp)
  const [computedFile, setComputedFile] = useState(null)

  const startFileDownload = (downloadUrl) => {
    window.location.href = downloadUrl
  }

  const handleFileDownload = () => {
    startFileDownload(computedFile.computed_file.download_url)
  }

  useEffect(() => {
    if (!compendium) return

    startFileDownload(compendium.computed_file.download_url)
    gtag.trackCompendiaDownload(compendium)
    setComputedFile(compendium)
  }, [compendium])

  return (
    <FixedContainer>
      {error ? (
        <Error
          statusCode={error}
          align="center"
          direction="column"
          marginTop="none"
        />
      ) : (
        <>
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
                    {formatString(computedFile?.primary_organism_name || '')}{' '}
                    compendium...
                  </Heading>
                </Box>
                <Paragraph>
                  If the download did not start,{' '}
                  <Anchor
                    href="#"
                    label="click here"
                    rel="noopener noreferrer"
                    onClick={handleFileDownload}
                  />
                  .
                </Paragraph>
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
        </>
      )}
    </FixedContainer>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { type } = query

  const compendiaQuery = {
    latest_version: true,
    limit: 1000,
    quant_sf_only: type === 'rna-seq'
  }

  const response = await api.compendia.get(compendiaQuery)

  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      compendia: response
    }
  }
}

export default DownloadFile
