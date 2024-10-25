import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { useCompendia } from 'hooks/useCompendia'
import { useResponsive } from 'hooks/useResponsive'
import getReadable from 'helpers/getReadable'
import { FileDownload, Hero, Tabs } from 'components/Compendia'
import { PageTitle } from 'components/shared/PageTitle'
import { SignUpBlock } from 'components/shared/SignUpBlock'
import { Spinner } from 'components/shared/Spinner'

export const Compendia = () => {
  const { setResponsive } = useResponsive()
  const {
    asPath,
    query: { type: currentType }
  } = useRouter()
  const { loading, getCompendia } = useCompendia()
  const [compendia, setCompendia] = useState(null)
  const isLoading = loading || !compendia
  const isDownload = asPath.includes('download')
  const titlePrefix = `${
    isDownload ? 'Download Compendia' : getReadable(currentType)
  } -`

  // fetches both compendia on page load
  useEffect(() => {
    const fetchCompendia = async () => {
      const [normalizedResponse, rnaSeqResponse] = await Promise.all([
        getCompendia('normalized'),
        getCompendia('rna-seq')
      ])

      setCompendia({
        normalized: normalizedResponse,
        'rna-seq': rnaSeqResponse
      })
    }

    fetchCompendia()
  }, [])

  return (
    <>
      <PageTitle title={titlePrefix} />
      {isDownload && <FileDownload />}
      {!isDownload && (
        <Box
          pad={{
            top: setResponsive('basex7', 'basex7', 'basex10')
          }}
        >
          <Hero />
          {isLoading ? (
            <Box
              pad={{
                bottom: setResponsive('basex7', 'basex7', 'basex10')
              }}
            >
              <Spinner />
            </Box>
          ) : (
            <Tabs compendia={compendia} type={currentType} />
          )}
          <SignUpBlock />
        </Box>
      )}
    </>
  )
}

export default Compendia
