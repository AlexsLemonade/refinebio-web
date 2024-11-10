import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Paragraph } from 'grommet'
import { useCompendia } from 'hooks/useCompendia'
import { useResponsive } from 'hooks/useResponsive'
import getReadable from 'helpers/getReadable'
import { Hero, Tabs } from 'components/Compendia'
import { PageTitle } from 'components/shared/PageTitle'
import { SignUpBlock } from 'components/shared/SignUpBlock'
import { Spinner } from 'components/shared/Spinner'

export const Compendia = () => {
  const { setResponsive } = useResponsive()
  const {
    query: { type }
  } = useRouter()
  const { hasError, loading, getCompendia } = useCompendia()
  const [compendia, setCompendia] = useState(null)
  const isLoading = loading || !compendia
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
      <PageTitle title={`${getReadable(type)} -`} />
      <Box pad={{ top: setResponsive('basex7', 'basex7', 'basex10') }}>
        <Hero />
        {/* TODO:remove hasError check in a subsequent issue */}
        {/* eslint-disable-next-line no-nested-ternary */}
        {hasError ? (
          <Paragraph>
            Download unavailable at this time. Please check again soon!
          </Paragraph>
        ) : isLoading ? (
          <Box pad={{ bottom: setResponsive('basex7', 'basex7', 'basex10') }}>
            <Spinner />
          </Box>
        ) : (
          <Tabs compendia={compendia} type={type} />
        )}
        <SignUpBlock />
      </Box>
    </>
  )
}

export default Compendia
