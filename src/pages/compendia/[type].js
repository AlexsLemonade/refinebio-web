import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import getReadable from 'helpers/getReadable'
import { FileDownload, Hero, Tabs } from 'components/Compendia'
import { PageTitle } from 'components/shared/PageTitle'
import { SignUpBlock } from 'components/shared/SignUpBlock'

export const Compendia = () => {
  const { setResponsive } = useResponsive()
  const {
    asPath,
    query: { type: currentType }
  } = useRouter()

  const isDownload = asPath.includes('download')
  const titlePrefix = `${
    isDownload ? 'Download Compendia' : getReadable(currentType)
  } -`

  return (
    <>
      <PageTitle title={titlePrefix} />
      {isDownload ? (
        <FileDownload />
      ) : (
        <Box
          pad={{
            top: setResponsive('basex7', 'basex7', 'basex10')
          }}
        >
          <Hero />
          <Tabs type={currentType} />
          <SignUpBlock />
        </Box>
      )}
    </>
  )
}

export default Compendia
