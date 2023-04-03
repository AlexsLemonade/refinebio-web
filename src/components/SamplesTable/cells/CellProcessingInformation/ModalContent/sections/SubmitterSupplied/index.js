import { Box, Heading } from 'grommet'
import {
  ArrayExpressSupplied,
  GeoSubmitterSupplied,
  SRASubmitterSupplied
} from './protocols-by-sample'

// renders the submitter supplied protocol information which depends on the type of sample
// https://github.com/AlexsLemonade/refinebio-frontend/issues/225#issuecomment-417345139
export const SubmitterSupplied = ({ sample, isSubmitterProcessed }) => {
  const protocolsBySampleType = {
    GEO: GeoSubmitterSupplied,
    SRA: SRASubmitterSupplied,
    ARRAY_EXPRESS: ArrayExpressSupplied
  }
  const Component = protocolsBySampleType[sample?.source_database]

  if (!Component) {
    return null
  }

  return (
    <>
      <Box margin={{ bottom: 'small' }} pad={{ horizontal: 'large' }}>
        <Heading level={3}>Submitter Supplied Protocol</Heading>
      </Box>
      <Component
        protocol_info={sample.protocol_info}
        isSubmitterProcessed={isSubmitterProcessed}
      />
    </>
  )
}

export default SubmitterSupplied
