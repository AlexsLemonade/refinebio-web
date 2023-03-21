import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { SamplesTable } from 'components/SamplesTable'

// endpoints:
// `v1/samples/?dataset_id=${datasetId}&organism__name=${organismName}`
// e.g.) v1/samples/?dataset_id=1df2e8d0-9d28-4330-97fb-3eff67876755&organism__name=HOMO_SAPIENS&offset=0&limit=10
export const ModalContent = ({ sampleMetadataFields, params, isImmutable }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      pad={{
        top: setResponsive('medium', 'large', 'basex6'),
        horizontal: setResponsive('small', 'medium', 'large')
      }}
    >
      <SamplesTable
        paramsToAdd={params}
        sampleMetadataFields={sampleMetadataFields}
        isImmutable={isImmutable}
        modalView
      />
    </Box>
  )
}

export default ModalContent
