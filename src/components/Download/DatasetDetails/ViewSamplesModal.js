import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { SamplesTableManagerContextProvider } from 'contexts/SamplesTableManagerContext'
import formatString from 'helpers/formatString'
import { SamplesTable } from 'components/shared/SamplesTable'
import { TextCapitalized } from 'components/shared/TextCapitalized'

export const ViewSamplesModal = ({
  dataset,
  sampleMetadataFields,
  params,
  isImmutable
}) => {
  const { setResponsive } = useResponsive()
  const isSpeciesView = Object.keys(params)[1] === 'organism__name'

  return (
    <Box
      pad={{
        horizontal: setResponsive('small', 'medium', 'large')
      }}
    >
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={2} size="small">
          My Dataset -{' '}
          {isSpeciesView ? (
            <TextCapitalized
              text={formatString(params[Object.keys(params)[1]])}
            />
          ) : (
            params[Object.keys(params)[1]]
          )}{' '}
          Samples
        </Heading>
      </Box>
      <SamplesTableManagerContextProvider>
        <SamplesTable
          sampleAccessions={dataset}
          queryToAdd={params}
          sampleMetadataFields={sampleMetadataFields}
          isImmutable={isImmutable}
          modalView
        />
      </SamplesTableManagerContextProvider>
    </Box>
  )
}

export default ViewSamplesModal
