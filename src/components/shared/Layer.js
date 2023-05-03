import { Layer as GrommetLayer } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const Layer = ({
  position = '',
  tabletMode = false,
  show = false,
  children
}) => {
  const { viewport } = useResponsive()
  if (viewport === 'large' || (viewport === 'medium' && !tabletMode)) {
    return children
  }

  if (show) {
    return <GrommetLayer position={position}>{children}</GrommetLayer>
  }

  return null
}

export default Layer
