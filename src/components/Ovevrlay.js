import { Box } from 'grommet'

export const Overlay = ({
  background = 'rgba4',
  duration = 150,
  opacity = 0,
  toggle
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {toggle && (
        <Box
          animation={{
            type: toggle ? 'fadeIn' : 'fedeOut',
            duration
          }}
          background={background}
          fill
          style={{ opacity, position: 'fixed', left: 0, top: 0, zIndex: 2 }}
        />
      )}
    </>
  )
}

export default Overlay
