import { useDatasetManager } from 'hooks/useDatasetManager'
import { Button } from 'components/shared/Button'

export const AddToDatasetButton = ({
  btnType = 'primary',
  dataToAdd,
  label = 'Add To Dataset',
  ...props
}) => {
  const { loading, addSamples } = useDatasetManager()

  return (
    <Button
      label={label}
      isLoading={loading}
      primary={btnType === 'primary'}
      secondary={btnType === 'secondary'}
      responsive
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClick={() => addSamples(dataToAdd)}
    />
  )
}

export default AddToDatasetButton
