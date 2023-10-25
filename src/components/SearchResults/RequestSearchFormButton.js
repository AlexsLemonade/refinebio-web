import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { ModalPage } from 'components/shared/ModalPage'
import { RequestSearchForm } from './RequestSearchForm'

export const RequestSearchFormButton = ({ queryTerm, size }) => {
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
      <RequestSearchForm
        closeForm={() => closeModal(id)}
        queryTerm={queryTerm}
      />
    </ModalPage>
  )
}

export default RequestSearchFormButton
