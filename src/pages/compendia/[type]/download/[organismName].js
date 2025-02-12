import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { useRefinebio } from 'hooks/useRefinebio'
import { useDownloadCompendium } from 'hooks/useDownloadCompendium'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import { compendia } from 'config'
import { Column } from 'components/shared/Column'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Explore } from 'components/Compendia/Explore'
import { FileDownloadForm } from 'components/Compendia/FileDownloadForm'
import { FileDownloadReady } from 'components/Compendia/FileDownloadReady'

export const DownloadCompendium = ({ compendium }) => {
  const { setResponsive } = useResponsive()
  const { acceptedTerms } = useRefinebio()
  const { error, downloadUrl } = useDownloadCompendium(compendium)
  const [downloadReady, setDownloadReady] = useState(false)

  useEffect(() => {
    if (acceptedTerms && downloadUrl) {
      setDownloadReady(true)
    }
  }, [acceptedTerms, downloadUrl])

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

  return (
    <FixedContainer>
      <Box
        align="center"
        pad={{
          top: 'large',
          bottom: 'xlarge'
        }}
      >
        <Row justify="center" width={setResponsive('100%', '85%')}>
          {downloadReady ? (
            <FileDownloadReady
              compendium={compendium}
              downloadUrl={downloadUrl}
            />
          ) : (
            <FileDownloadForm compendium={compendium} />
          )}
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
  const { type, organismName } = query
  // The routes must be the valid compendia types
  if (!compendia.types.includes(type)) return { notFound: true }

  const compendiaQuery = {
    latest_version: true,
    limit: 1000,
    quant_sf_only: type === 'rna-seq'
  }

  const response = await api.compendia.get(compendiaQuery)

  if (response.ok && response.results) {
    // finds the compendium that matches organismName
    const compendium = response.results.find(
      (organism) => organism.primary_organism_name === organismName
    )

    return {
      props: {
        compendium
      }
    }
  }

  return { notFound: true }
}

export default DownloadCompendium
