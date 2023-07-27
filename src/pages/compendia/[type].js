import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { CompendiaHero, CompendiaTabs } from 'components/Compendia'
import { PageTitle } from 'components/shared/PageTitle'
import { SignUpBlock } from 'components/shared/SignUpBlock'

export const Compendia = () => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <PageTitle title="Compendia" noSuffix />
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
