import { Box, Heading, Text } from 'grommet'
import formatString from 'helpers/formatString'
import truncateOnWord from 'helpers/truncateOnWord'
import { Accordion, AccordionPanel } from 'components/shared/Accordion'
import { Anchor } from 'components/Anchor'

const Title =
  ({ protocol }) =>
  (expand) =>
    (
      <>
        <Heading level={5} responsive={false} weight="500">
          {formatString(protocol.Type)}
        </Heading>
        <Text>
          {!expand ? truncateOnWord(protocol.Text, 80) : protocol.Text}
        </Text>
      </>
    )

export const ArrayExpressSupplied = ({ protocol_info: protocolInfo }) => {
  return (
    <Box pad={{ horizontal: 'large' }}>
      <Accordion>
        {protocolInfo.map((protocol) => (
          <AccordionPanel key={protocol.Accession} title={Title({ protocol })}>
            <Text margin={{ top: 'xsmall' }}>
              <strong>Reference</strong>{' '}
              <Anchor
                label={protocol.Reference}
                href={protocol.Reference}
                rel="noopener noreferrer"
                target="_blank"
              />
            </Text>
          </AccordionPanel>
        ))}
      </Accordion>
    </Box>
  )
}

export default ArrayExpressSupplied
