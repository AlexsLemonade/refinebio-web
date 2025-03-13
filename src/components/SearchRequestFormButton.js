import { useModal } from 'hooks/useModal'
import { Button } from 'components/Button'
import { ModalPage } from 'components/ModalPage'
import { SearchRequestForm } from 'components/SearchRequestForm'

export const SearchRequestFormButton = ({ size }) => {
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
      <SearchRequestForm onSubmit={() => closeModal(id)} />
    </ModalPage>
  )
}

export default SearchRequestFormButton
