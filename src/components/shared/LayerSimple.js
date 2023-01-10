import { Layer as GrommetLayer } from 'grommet'

// returns the children based on a boolean value 'show'
export const LayerSimple = ({
  full = false,
  position = '',
  show = false,
  children
}) => {
  if (!show) return children

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {show && (
        <GrommetLayer position={position} full={full}>
          {children}
        </GrommetLayer>
      )}
    </>
  )
}

export default LayerSimple
