import { Layer as GrommetLayer } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const Layer = ({ position = '', show = false, children }) => {
  const { viewport } = useResponsive()
  if (viewport !== 'small') return children

  if (show) return <GrommetLayer position={position}>{children}</GrommetLayer>

  return null
}

export default Layer
