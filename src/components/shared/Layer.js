import { Layer as GrommetLayer } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'

export const Layer = ({ position = '', show = false, children }) => {
  const { viewport } = useResponsive()
  if (viewport !== 'small') return children
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{show && <GrommetLayer position={position}>{children}</GrommetLayer>}</>
  )
}

export default Layer
