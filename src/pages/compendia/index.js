import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { CompendiaHero } from 'components/Compendia'

export const Compendia = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      pad={{
        top: setResponsive('basex7', 'basex7', 'basex10')
      }}
    >
      <CompendiaHero />
    </Box>
  )
}

export default Compendia
