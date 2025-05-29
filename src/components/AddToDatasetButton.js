import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { Button } from 'components/Button'

export const AddToDatasetButton = ({ dataToAdd, ...props }) => {
  const { loading, addSamples } = useDatasetManager()

  const handleClick = () => {
    addSamples(dataToAdd)
    gtag.trackDatasetAction('AddToDatasetButton')
  }

  return (
    <Button
      label="Add To Dataset"
      isLoading={loading}
      responsive
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClick={handleClick}
    />
  )
}

export default AddToDatasetButton
