import formatString from 'helpers/formatString'

// Formats sample_metadata names for UI (e.g., 'specimen_part' to 'Specimen part')
export default (sampleMetadata) => sampleMetadata.map(formatString)
