import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Box, Form } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import gtag from 'analytics/gtag'
import { Button } from 'components/Button'
import { Row } from 'components/Row'
import { AdvancedOptions } from './AdvancedOptions'
import { AdvancedOptionsToggle } from './AdvancedOptionsToggle'
import { AggregateOptions } from './AggregateOptions'
import { TransformationOptions } from './TransformationOptions'

export const DatasetDownloadOptionsForm = ({
  dataset,
  buttonLabel = 'Download',
  onOptionsChange = null // if not defined dataset changes will persist on the API
}) => {
  const { push } = useRouter()
  const { createDataset, updateDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const [toggleAdvancedOption, setToggleAdvancedOption] = useState(
    dataset.quantile_normalize
  )

  const handleSubmitForm = async (downloadOptions) => {
    const params = { ...dataset, ...downloadOptions }
    const response = await updateDataset(
      onOptionsChange ? await createDataset() : dataset.id,
      params
    )
    const pathname = onOptionsChange ? `/dataset/${response.id}` : '/download'

    if (onOptionsChange) gtag.trackRegeneratedDataset(dataset, response)

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

    if (onOptionsChange) {
      onOptionsChange(newDownloadOption)
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

export default DatasetDownloadOptionsForm
