import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { ModalPage } from 'components/shared/ModalPage'
import { MissingResultsForm } from './MissingResultsForm'

export const MissingResultsFormButton = ({ size }) => {
  const { closeModal, openModal } = useModal()
  const id = 'missing-results-form'

  return (
    <ModalPage
      id={id}
      button={
        <Button
          label="Let us know"
          link
          linkFontSize={size}
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
    >
      <MissingResultsForm closeForm={() => closeModal(id)} />
    </ModalPage>
  )
}

export default MissingResultsFormButton
