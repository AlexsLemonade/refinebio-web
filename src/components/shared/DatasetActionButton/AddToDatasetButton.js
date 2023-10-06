import { Button } from 'components/shared/Button'

export const AddToDatasetButton = ({
  dataToAdd,
  label = 'Add To Dataset',
  ...props
}) => {
  const handleAdd = () => {} // TEMP: replace with useDatasetManager method

  return (
    <Button
      label={label}
      responsive
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onClick={() => handleAdd(dataToAdd)}
    />
  )
}

export default AddToDatasetButton
