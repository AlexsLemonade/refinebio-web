import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'
import { Explore } from 'components/Compendia/Explore'
import downloadFile from 'helpers/downloadFile'
import formatString from 'helpers/formatString'

export const FileDownload = () => {
  const {
    isReady,
    push,
    query: { organism, url }
  } = useRouter()
  const { setResponsive } = useResponsive()

  const [organismName, setOrganismName] = useState('')

  useEffect(() => {
    if (!isReady) return

    setOrganismName(formatString(organism))

    if (url) {
      downloadFile(url)
    } else {
      push('/compendia/normalize')
    }
  }, [isReady])

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
                {organismName} compendium...
              </Heading>
            </Box>
            <Paragraph>
              If the download did not start,{' '}
              <Anchor href={url} label="click here" rel="noopener noreferrer" />
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
  )
}

export default FileDownload
