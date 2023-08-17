import { useModal } from 'hooks/useModal'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'

const width = '650px'

const ModalOne = () => {
  const { openModal } = useModal()

  const modalId = 'ModalOne'

  return (
    <Modal
      id={modalId}
      button={
        <Button label="Modal 1" onClick={() => openModal(modalId)} primary />
      }
      width={width}
    >
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
          posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Sed ac molestie quam, in
          finibus est. Fusce porta metus sit amet condimentum finibus. Vivamus
          condimentum massa in orci elementum tempor. Nunc commodo tellus vel
          elementum congue. Curabitur dignissim venenatis neque et suscipit.
          Nullam lobortis eros sapien, vitae bibendum risus pretium eget.
        </Paragraph>
      </Box>
    </Modal>
  )
}

const ModalTwo = () => {
  const { openModal } = useModal()

  const modalId = 'ModalTwo'

  return (
    <Modal
      id={modalId}
      button={
        <Button label=" Modal 2" onClick={() => openModal(modalId)} primary />
      }
      width={width}
    >
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
          faucibus. Vivamus ullamcorper nibh risus, a tincidunt tellus tempor
          at.
        </Paragraph>
      </Box>
      <Box border={{ side: 'bottom' }} margin={{ vertical: 'medium' }} />
      <Box pad={{ horizontal: 'large', bottom: 'large' }}>
        <Heading level={4}>Vestibulum</Heading>
        <Paragraph>
          Nunc laoreet maximus massa. Aenean faucibus rhoncus felis quis
          faucibus. Vivamus ullamcorper nibh risus, a tincidunt tellus tempor
          at.
        </Paragraph>
      </Box>
    </Modal>
  )
}

const ParentModalContent = () => (
  <Box pad={{ horizontal: 'large', bottom: 'large' }}>
    <Heading margin={{ bottom: 'small' }} level={1}>
      Parent Modal
    </Heading>
    <Box margin={{ bottom: 'small' }}>
      <Pill label="refine.bio processed" status="success" />
    </Box>

    <Heading level={4}>Maecenas</Heading>
    <Paragraph>
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia
      nostra, per inceptos himenaeos. Sed ac molestie quam, in finibus est.
      Fusce porta metus sit amet condimentum finibus. Vivamus condimentum massa
      in orci elementum tempor. Nunc commodo tellus vel elementum congue.
      Curabitur dignissim venenatis neque et suscipit. Nullam lobortis eros
      sapien, vitae bibendum risus pretium eget.
    </Paragraph>
  </Box>
)

const ChildModalContent = () => (
  <>
    <Box pad={{ horizontal: 'large' }}>
      <Heading margin={{ bottom: 'small' }} level={1}>
        Child Modal
      </Heading>
      <Box margin={{ bottom: 'small' }}>
        <Pill label="refine.bio processed" status="success" />
      </Box>

      <Heading level={4}>Aenean</Heading>
      <Paragraph>
        Nunc laoreet maximus massa. Aenean faucibus rhoncus felis quis faucibus.
        Vivamus ullamcorper nibh risus, a tincidunt tellus tempor at. Nunc
        laoreet maximus massa. Aenean faucibus rhoncus felis quis faucibus.
        Vivamus ullamcorper nibh risus, a tincidunt tellus tempor at.
      </Paragraph>
    </Box>
    <Box border={{ side: 'bottom' }} margin={{ vertical: 'medium' }} />
    <Box pad={{ horizontal: 'large', bottom: 'large' }}>
      <Heading level={4}>Vestibulum</Heading>
      <Paragraph>
        Nunc laoreet maximus massa. Aenean faucibus rhoncus felis quis faucibus.
        Vivamus ullamcorper nibh risus, a tincidunt tellus tempor at. Nunc
        laoreet maximus massa. Aenean faucibus rhoncus felis quis faucibus.
        Vivamus ullamcorper nibh risus, a tincidunt tellus tempor at.
      </Paragraph>
    </Box>
  </>
)

const NestedModals = () => {
  const { openModal, closeModal } = useModal()
  const id1 = 'modal1-id'
  const id2 = 'modal2-id'
  return (
    <Box align="center" justify="center">
      <Modal
        id={id1}
        button={
          <Button
            onClick={() => openModal(id1)}
            label="Nested Modals"
            primary
          />
        }
        width={width}
      >
        <Box>
          <ParentModalContent />
          <Box>
            <Modal
              id={id2}
              button={
                <Button
                  onClick={() => openModal(id2)}
                  label="Open Child"
                  primary
                />
              }
              width={width}
            >
              <ChildModalContent />
            </Modal>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

const ModalContent = () => {
  return (
    <Box align="center" justify="center" margin={{ top: 'large' }}>
      <Box>
        <ModalOne />
      </Box>
      <Box margin={{ top: 'medium' }}>
        <ModalTwo />
      </Box>
      <Box margin={{ top: 'medium' }}>
        <NestedModals />
      </Box>
    </Box>
  )
}

export default {
  title: 'Modal',
  component: ModalContent
}

const Template = () => <ModalContent />

export const Default = Template.bind({})
Default.storyName = 'Modal'
