import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FileDownload, Hero, Tabs } from 'components/Compendia'
import { PageTitle } from 'components/shared/PageTitle'
import { SignUpBlock } from 'components/shared/SignUpBlock'

export const Compendia = () => {
  const { asPath, isReady } = useRouter()
  const { setResponsive } = useResponsive()
  const [tabName, setTabName] = useState('')

  useEffect(() => {
    if (!isReady) return
    setTabName(
      `${
        // eslint-disable-next-line no-nested-ternary
        asPath.includes('normalized')
          ? 'Normalized'
          : asPath.includes('rna-seq')
          ? 'RNA-seq'
          : 'Download'
      } Compendia -`
    )
  }, [asPath, isReady])

  return (
    <>
      <PageTitle title={tabName} />
      {asPath.includes('download') ? (
        <FileDownload />
      ) : (
        <Box
          pad={{
            top: setResponsive('basex7', 'basex7', 'basex10')
          }}
        >
          <Hero />
          <Tabs />
          <SignUpBlock />
        </Box>
      )}
    </>
  )
}

export default Compendia
