import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Box, Form } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import { AdvanedOptions } from './AdvanedOptions'
import { AdvancedOptionsToggle } from './AdvancedOptionsToggle'
import { AggregateOptions } from './AggregateOptions'
import { TransformationOptions } from './TransformationOptions'

export const DownloadOptionsForm = ({
  dataset = null,
  buttonLabel = 'Download',
  onSubmit = null
}) => {
  const { push } = useRouter()
  const {
    dataset: datasetState,
    updateDataset,
    getDownloadOptions,
    updateDownloadOptions
  } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const selectedDataset = dataset || datasetState
  const [toggleAdvancedOption, setToggleAdvancedOption] = useState(
    selectedDataset.quantile_normalize
  )

  useEffect(() => {
    if (selectedDataset) {
      updateDownloadOptions({
        ...getDownloadOptions(selectedDataset)
      })
    }
  }, [])

  const handleSubmitForm = async (downloadOptions) => {
    let pathname = '/download'

    if (onSubmit) {
      const response = await onSubmit(downloadOptions)
      pathname = response
    } else {
      await updateDataset(selectedDataset.id, {
        ...downloadOptions,
        data: selectedDataset.data
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

  const handleUpdateDownloadOptions = (change) => (name, newValue) => {
    updateDownloadOptions({ [name]: newValue }, selectedDataset.id)
    return change({
      target: {
        name,
        value: newValue
      }
    })
  }

  return (
    <Box border={{ side: 'bottom' }}>
      <Formik
        initialValues={{
          aggregate_by: selectedDataset.aggregate_by,
          data: selectedDataset.data,
          scale_by: selectedDataset.scale_by,
          quantile_normalize: selectedDataset.quantile_normalize
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
                    handleChange={handleUpdateDownloadOptions(handleChange)}
                  />
                  <TransformationOptions
                    value={values.scale_by}
                    handleChange={handleUpdateDownloadOptions(handleChange)}
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
                <AdvanedOptions
                  id={selectedDataset.id}
                  values={values}
                  toggle={!toggleAdvancedOption}
                  handleChange={handleUpdateDownloadOptions(handleChange)}
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
    </Box>
  )
}

export default DownloadOptionsForm
