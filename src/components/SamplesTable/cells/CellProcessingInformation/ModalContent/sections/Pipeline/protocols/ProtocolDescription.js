import { Box, Heading, Paragraph } from 'grommet'

export const ProtocolDescription = ({ name, description }) => (
  <>
    <Box margin={{ bottom: 'xsmall' }}>
      <Heading level={3} size="h3Small">
        {name}
      </Heading>
    </Box>
    <Paragraph>{description}</Paragraph>
  </>
)

export default ProtocolDescription
