import { Box, Heading, Paragraph } from 'grommet'
import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { Modal } from 'components/shared/Modal'

export const UnknownGeneIdentifierModal = () => {
  const { openModal } = useModal()
  const id = 'unknown-gene-identifier'

  return (
    <Modal
      id={id}
      button={
        <Button
          label="Unknown Gene Identifier Modal"
          tertiary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
    >
      <Box
        align="center"
        border={{ side: 'bottom' }}
        direction="row"
        gap="xsmall"
        margin={{ bottom: 'medium' }}
        pad={{ bottom: 'small', horizontal: 'large' }}
      >
        <Icon color="coral-shade-20" name="Warning" size="large" />
        <Heading level={1}>Unknown Gene Identifier</Heading>
      </Box>
      <Box
        pad={{ bottom: 'large', horizontal: 'large' }}
        width={{ max: '760px' }}
      >
        <Paragraph>
          We can not process these data because the raw data are unavailable and
          we can not reliably detect what type of gene identifier the submitter
          used for annotation.
        </Paragraph>
      </Box>
    </Modal>
  )
}

export default UnknownGeneIdentifierModal
