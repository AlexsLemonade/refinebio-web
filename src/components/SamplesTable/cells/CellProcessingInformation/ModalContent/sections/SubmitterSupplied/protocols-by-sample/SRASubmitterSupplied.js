import { Box, Paragraph, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'

export const SRASubmitterSupplied = ({ protocol_info: protocolInfo }) => (
  <Box pad={{ horizontal: 'large' }}>
    {protocolInfo.map((info) => (
      <Box key={info.Description}>
        <Paragraph>{info.Description}</Paragraph>
        <Text margin={{ top: 'xsmall' }}>
          <strong>Reference</strong>{' '}
          <Anchor
            href={info.Reference}
            label={info.Reference}
            rel="noopener noreferrer"
            target="_blank"
          />
        </Text>
      </Box>
    ))}
  </Box>
)

export default SRASubmitterSupplied
