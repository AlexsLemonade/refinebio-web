import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Compendia = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      pad={{
        top: setResponsive('basex7', 'basex7', 'basex10')
      }}
    >
      Compendia
    </Box>
  )
}

export default Compendia
