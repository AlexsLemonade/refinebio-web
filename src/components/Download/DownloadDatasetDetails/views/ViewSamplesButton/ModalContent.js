import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatString from 'helpers/formatString'
import { SamplesTable } from 'components/SamplesTable'
import { TextCapitalized } from 'components/shared/TextCapitalized'

// endpoints:
// `v1/samples/?dataset_id=${datasetId}&organism__name=${organismName}`
// e.g.) v1/samples/?dataset_id=1df2e8d0-9d28-4330-97fb-3eff67876755&organism__name=HOMO_SAPIENS&offset=0&limit=10
export const ModalContent = ({
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
      <SamplesTable
        experimentSampleAssociations={dataset}
        queryToAdd={params}
        sampleMetadataFields={sampleMetadataFields}
        isImmutable={isImmutable}
        modalView
      />
    </Box>
  )
}

export default ModalContent
