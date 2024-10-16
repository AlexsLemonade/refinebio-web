import { Box, Heading, Paragraph } from 'grommet'

export const ProtocolDescription = ({ name, description }) => (
  <>
    <Box margin={{ bottom: 'xsmall' }}>
      <Heading level={2} size="small">
        {name}
      </Heading>
    </Box>
    <Paragraph>{description}</Paragraph>
  </>
)

export default ProtocolDescription
