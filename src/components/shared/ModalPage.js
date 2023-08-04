import { Box, Grid } from 'grommet'
import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Portal } from 'components/shared//Portal'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

// e.g.) pass the unique 'id' to openModal method in the 'button' prop
// <ModalPage button={<Button label="Open Modal Page" onClick={()=> openModal(id)}>}>
//    {children}
// </ModalPage>

export const ModalPage = ({
  id, // must be unique
  button, // the button whicn opens a modal page
  children,
  cleanUp = () => {}
}) => {
  const { modal, closeModal } = useModal()

  const handleClose = () => {
    closeModal(id)
    cleanUp()
  }

  return (
    <>
      {button}
      {modal && modal[id] && modal[id].show ? (
        <Portal>
          <Grid
            areas={[
              { name: 'header', start: [0, 0], end: [1, 0] },
              { name: 'main', start: [0, 1], end: [1, 1] },
              { name: 'footer', start: [0, 2], end: [1, 2] }
            ]}
            columns={['auto', 'auto']}
            rows={['auto', 'auto', 'auto']}
            width="100%"
            style={{ background: 'white' }}
          >
            <Box gridArea="header" margin={{ bottom: 'xlarge' }}>
              <Header />
            </Box>
            <FixedContainer gridArea="main">
              <Button label="Back" secondary responsive onClick={handleClose} />
              <Box margin={{ top: 'large' }}>{children}</Box>
            </FixedContainer>
            <Box
              gridArea="footer"
              margin={{ top: 'basex7' }}
              style={{ boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Footer />
            </Box>
          </Grid>
        </Portal>
      ) : null}
    </>
  )
}

export default ModalPage
