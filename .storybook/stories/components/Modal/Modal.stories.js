import { getTitle } from 'utils/getTitle'
import { Box, Heading, Paragraph } from 'grommet'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'
import { Button } from 'components/shared/Button'
import { useModal } from 'hooks/useModal'

const ModalOne = ({ id }) => {
  const { modal, setModal } = useModal()

  const handleClick = () => {
    setModal({
      show: true,
      id: 'ModalOne'
    })
  }

  return (
    <>
      <Button label="Modal 1" onClick={handleClick} primary />

      {modal.id === id && (
        <Modal>
          <Box pad={{ horizontal: 'large', bottom: 'large' }}>
            <Heading margin={{ bottom: 'small' }} level={1}>
              Praesent vitae erat nisl
            </Heading>
            <Box margin={{ bottom: 'small' }}>
              <Pill label="refine.bio processed" status="success" />
            </Box>

            <Heading level={4}>Maecenas</Heading>
            <Paragraph>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Sed ac
              molestie quam, in finibus est. Fusce porta metus sit amet
              condimentum finibus. Vivamus condimentum massa in orci elementum
              tempor. Nunc commodo tellus vel elementum congue. Curabitur
              dignissim venenatis neque et suscipit. Nullam lobortis eros
              sapien, vitae bibendum risus pretium eget.
            </Paragraph>
          </Box>
        </Modal>
      )}
    </>
  )
}

const ModalTwo = ({ id }) => {
  const { modal, setModal } = useModal()

  const handleClick = () => {
    setModal({
      show: true,
      id: 'ModalTwo'
    })
  }

  return (
    <>
      <Button label=" Modal 2" onClick={handleClick} primary />

      {modal.id === id && (
        <Modal>
          <Box pad={{ horizontal: 'large' }}>
            <Heading margin={{ bottom: 'small' }} level={1}>
              Lorem ipsum dolor sit amet
            </Heading>
            <Box margin={{ bottom: 'small' }}>
              <Pill label="refine.bio processed" status="success" />
            </Box>

            <Heading level={4}>Aenean</Heading>
            <Paragraph>
              Nunc laoreet maximus massa. Aenean faucibus rhoncus felis quis
              faucibus. Vivamus ullamcorper nibh risus, a tincidunt tellus
              tempor at.
            </Paragraph>
          </Box>
          <Box border={{ side: 'bottom' }} margin={{ vertical: 'medium' }} />
          <Box pad={{ horizontal: 'large', bottom: 'large' }}>
            <Heading level={4}>Vestibulum</Heading>
            <Paragraph>
              Nunc laoreet maximus massa. Aenean faucibus rhoncus felis quis
              faucibus. Vivamus ullamcorper nibh risus, a tincidunt tellus
              tempor at.
            </Paragraph>
          </Box>
        </Modal>
      )}
    </>
  )
}

const ModalContent = ({ id }) => {
  return (
    <Box align="center" justify="center" margin={{ top: 'large' }}>
      <Box>
        <ModalOne id="ModalOne" />
      </Box>
      <Box margin={{ top: 'medium' }}>
        <ModalTwo id="ModalTwo" />
      </Box>
    </Box>
  )
}

export default {
  title: getTitle('Modal'),
  component: ModalContent
}

const Template = (args) => <ModalContent />

export const Default = Template.bind({})
Default.storyName = 'Modal'
