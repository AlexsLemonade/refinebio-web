import { formatString } from 'helpers/formatString'
import { Box, Heading } from 'grommet'
import {
  InformationList,
  InformationItem
} from 'components/shared/InformationList'
import {
  CellAdditionalMetadata,
  CellProcessingInformation
} from 'components/SamplesTable'

const InformationItemBlock = ({ field, value, textNull }) => {
  return (
    <InformationItem
      field={field}
      value={value}
      textNull={textNull}
      margin={{ left: '-32px' }}
      width={{ min: 'calc(100% + 64px)' }}
    />
  )
}

export const SampleMetadataFields = ({ sample }) => {
  const fields = [
    'sex',
    'age',
    'specimen_part',
    'genotype',
    'disease',
    'disease_stage',
    'cell_line',
    'treatment',
    'race',
    'subject',
    'compound',
    'time'
  ]

  return (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={4} size="h4_xsmall">
          Sample Metadata Fields
        </Heading>
      </Box>

      <InformationList>
        {fields.map(
          (field) =>
            sample[field] && (
              <InformationItemBlock
                key={field}
                field={formatString(field)}
                value={sample[field]}
                textNull="NA"
                margin={{ left: '-32px' }}
                width={{ min: 'calc(100% + 64px)' }}
              />
            )
        )}
        <InformationItemBlock
          field="Processing Information"
          value={<CellProcessingInformation row={{ original: sample }} />}
          textNull="NA"
          margin={{ left: '-32px' }}
          width={{ min: 'calc(100% + 64px)' }}
        />
        <InformationItemBlock
          field="Additional Metadata"
          value={<CellAdditionalMetadata row={{ original: sample }} />}
          textNull="NA"
          margin={{ left: '-32px' }}
          width={{ min: 'calc(100% + 64px)' }}
        />
      </InformationList>
    </>
  )
}

export default SampleMetadataFields
