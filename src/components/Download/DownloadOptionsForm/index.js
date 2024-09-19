import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Box, Form } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import { AdvancedOptions } from './AdvancedOptions'
import { AdvancedOptionsToggle } from './AdvancedOptionsToggle'
import { AggregateOptions } from './AggregateOptions'
import { TransformationOptions } from './TransformationOptions'

export const DownloadOptionsForm = ({
  dataset = null,
  buttonLabel = 'Download',
  isProcessed = false,
  handleDownloadOptionsChanges = null, // for the regenerate dataset local state update
  onSubmit = null // for the regenerate dataset download
}) => {
  const { push } = useRouter()
  const {
    dataset: myDataset,
    updateDataset,
    getDownloadOptions,
    updateDownloadOptions
  } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const [currentDataset, setCurrentDataset] = useState(null)
  const [toggleAdvancedOption, setToggleAdvancedOption] = useState(
    currentDataset?.quantile_normalize
  )

  useEffect(() => {
    // sets the dataset either dataset via dataset/id or myDataset
    setCurrentDataset(isProcessed ? dataset : myDataset)
  }, [dataset])

  useEffect(() => {
    if (!currentDataset) return
    // sets the initial download options
    updateDownloadOptions(
      {
        ...getDownloadOptions(currentDataset)
      },
      currentDataset.id,
      isProcessed
    )
  }, [currentDataset])

  const handleSubmitForm = async (downloadOptions) => {
    let pathname = '/download'

    if (onSubmit) {
      const response = await onSubmit(downloadOptions)
      pathname = response
    }
    // updates only for myDataset (in /download)
    if (!isProcessed) {
      await updateDataset(currentDataset.id, {
        ...downloadOptions,
        data: currentDataset.data
      })
    }

    push(
      {
        pathname,
        query: {
          start: true
        }
      },
      pathname
    )
  }

  const handleUpdateDownloadOptions = async (name, newOption) => {
    const newDownloadOption = { [name]: newOption }

    if (isProcessed && handleDownloadOptionsChanges) {
      handleDownloadOptionsChanges(newDownloadOption)
    }

    await updateDownloadOptions(
      newDownloadOption,
      currentDataset.id,
      isProcessed
    )
  }

  return (
    <Box border={{ side: 'bottom' }}>
      {currentDataset && (
        <Formik
          initialValues={{
            aggregate_by: currentDataset.aggregate_by,
            data: currentDataset.data,
            scale_by: currentDataset.scale_by,
            quantile_normalize: currentDataset.quantile_normalize
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await handleSubmitForm(values)
            setSubmitting(false)
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting, values }) => (
            <Form onSubmit={handleSubmit}>
              <Row direction={setResponsive('column', 'column', 'row')}>
                <Box>
                  <Row align={setResponsive('start', 'center')} justify="start">
                    <AggregateOptions
                      value={values.aggregate_by}
                      handleChange={handleChange}
                      handleUpdateDownloadOptions={handleUpdateDownloadOptions}
                    />
                    <TransformationOptions
                      value={values.scale_by}
                      handleChange={handleChange}
                      handleUpdateDownloadOptions={handleUpdateDownloadOptions}
                    />
                    <Box
                      margin={{
                        top: setResponsive('xsmall', 'none'),
                        left: setResponsive('none', 'xsmall')
                      }}
                    >
                      <AdvancedOptionsToggle
                        toggle={toggleAdvancedOption}
                        setToggle={setToggleAdvancedOption}
                      />
                    </Box>
                  </Row>
                  <AdvancedOptions
                    id={currentDataset.id}
                    values={values}
                    toggle={!toggleAdvancedOption}
                    handleChange={handleChange}
                    handleUpdateDownloadOptions={handleUpdateDownloadOptions}
                  />
                </Box>
                <Button
                  label={buttonLabel}
                  isLoading={isSubmitting}
                  primary
                  responsive
                  margin={{
                    bottom: setResponsive('small', 'small', 'none')
                  }}
                  type="submit"
                />
              </Row>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  )
}

export default DownloadOptionsForm
