import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { Button } from 'components/shared/Button'

export const AddToDatasetButton = ({
  dataToAdd,
  label = 'Add To Dataset',
  ...props
}) => {
  const { loading, addSamples } = useDatasetManager()

  const handleClick = () => {
    addSamples(dataToAdd)
    gtag.myDatasetAction(label)
  }

  return (
    <Button
      label={label}
      isLoading={loading}
      responsive
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClick={handleClick}
    />
  )
}

export default AddToDatasetButton
