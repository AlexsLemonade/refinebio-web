import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { CompendiaHero } from 'components/Compendia'
import { SignUpBlock } from 'components/shared/SignUpBlock'

export const Compendia = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      pad={{
        top: setResponsive('basex7', 'basex7', 'basex10')
      }}
    >
      <CompendiaHero />
      <SignUpBlock />
    </Box>
  )
}

export default Compendia
