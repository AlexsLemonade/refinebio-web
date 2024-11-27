import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Box, Form } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import getDatasetState from 'helpers/getDatasetState'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import { AdvancedOptions } from './AdvancedOptions'
import { AdvancedOptionsToggle } from './AdvancedOptionsToggle'
import { AggregateOptions } from './AggregateOptions'
import { TransformationOptions } from './TransformationOptions'

export const DownloadOptionsForm = ({
  dataset,
  buttonLabel = 'Download',
  handleDownloadOptionsChanges = null, // handles the local state update for processed datasets
  onSubmit = null // handles the regenerate dataset download
}) => {
  const { push } = useRouter()
  const { updateDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { isProcessed } = getDatasetState(dataset)

  const [toggleAdvancedOption, setToggleAdvancedOption] = useState(
    dataset?.quantile_normalize
  )

  const handleSubmitForm = async (downloadOptions) => {
    let pathname = '/download'

    if (onSubmit) {
      const response = await onSubmit(downloadOptions)
      pathname = response
    }
    // updates via API call only for My Dataset in /download (unprocessed)
    if (!isProcessed) {
      await updateDataset(dataset.id, { ...dataset, ...downloadOptions })
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

    if (handleDownloadOptionsChanges) {
      handleDownloadOptionsChanges(newDownloadOption)
    } else {
      await updateDataset(dataset.id, { ...dataset, ...newDownloadOption })
    }
  }

  return (
    <Box border={{ side: 'bottom' }}>
      {dataset && (
        <Formik
          initialValues={{
            aggregate_by: dataset.aggregate_by,
            data: dataset.data,
            scale_by: dataset.scale_by,
            quantile_normalize: dataset.quantile_normalize
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
                    id={dataset.id}
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
