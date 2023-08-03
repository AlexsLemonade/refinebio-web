import { Layer as GrommetLayer } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const LayerResponsive = ({
  position = '',
  tabletMode = false,
  show = false,
  children
}) => {
  const { viewport } = useResponsive()
  if (viewport === 'large' || (viewport === 'medium' && !tabletMode)) {
    return children
  }

  if (!show) return null

  return <GrommetLayer position={position}>{children}</GrommetLayer>
}

export default LayerResponsive
