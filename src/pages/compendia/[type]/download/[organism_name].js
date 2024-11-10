import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Paragraph } from 'grommet'
import gtag from 'analytics/gtag'
import { useCompendia } from 'hooks/useCompendia'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'
import { PageTitle } from 'components/shared/PageTitle'
import { Explore } from 'components/Compendia/Explore'
import formatString from 'helpers/formatString'

export const DownloadFile = () => {
  const {
    isReady,
    query: { id }
  } = useRouter()
  const { setResponsive } = useResponsive()
  const { downloadCompendia } = useCompendia()
  const [computedFile, setComputedFile] = useState(null)

  const downloadComputedFile = async () => {
    const response = await downloadCompendia(id)
    gtag.trackCompendiaDownload(response)
    setComputedFile(response)
    startFileDownload(response.computed_file.download_url)
  }

  const startFileDownload = (downloadUrl) => {
    window.location.href = downloadUrl
  }

  const handleFileDownload = () => {
    startFileDownload(computedFile.computed_file.download_url)
  }

  useEffect(() => {
    if (!isReady) return
    downloadComputedFile()
  }, [isReady])

  return (
    <>
      <PageTitle title="Download Compendia -" />
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
      </FixedContainer>
    </>
  )
}

export default DownloadFile
