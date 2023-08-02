import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { CompendiaHero, CompendiaTabs } from 'components/Compendia'
import { PageTitle } from 'components/shared/PageTitle'
import { SignUpBlock } from 'components/shared/SignUpBlock'

export const Compendia = () => {
  const { asPath, isReady } = useRouter()
  const { setResponsive } = useResponsive()
  const [tabName, setTabName] = useState('')

  useEffect(() => {
    if (!isReady) return

    setTabName(
      `${asPath.includes('normalized') ? 'Normalized' : 'RNA-seq'} Compendia -`
    )
  }, [asPath, isReady])

  return (
    <>
      <PageTitle title={tabName} />
      <Box
        pad={{
          top: setResponsive('basex7', 'basex7', 'basex10')
        }}
      >
        <CompendiaHero />
        <CompendiaTabs />
        <SignUpBlock />
      </Box>
    </>
  )
}

export default Compendia
