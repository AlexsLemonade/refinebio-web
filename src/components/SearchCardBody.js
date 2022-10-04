import { Box, Heading, Paragraph, Text } from 'grommet'
import { Link } from 'components/shared/Link'
import styled from 'styled-components'
import data from 'api/data'

const Section = styled(Box)`
  margin-top: 24px;

  + div {
    margin-top: 16px;
  }
`

export const SearchCardBody = () => {
  return (
    <>
      <Section>
        <Heading level={4}>Description</Heading>
        <Paragraph>
          Activation of Sirtuin (silent mating type information regulation 2
          homolog) 1, or SIRT1, is an unexplored therapeutic approach for
          treatment of inflammatory diseases. The goal of this study was to
          evaluate the clinical activity and tolerability of multiple doses of
          SRT2104, a selective activator of SIRT1, in patients with moderate to
          severe psoriasis after day 84 of treatment.
        </Paragraph>
      </Section>
      <Section>
        <Heading level={4}>Publication Title</Heading>
        <Paragraph color="gray-shade-40">
          <i>No associated publication</i>
        </Paragraph>
      </Section>
      <Section>
        <Heading level={4}>Alternate Accession IDs</Heading>
        <Link href={data.SearchCardBody.url} label="E-GEOD-12934" />
      </Section>
      <Section>
        <Heading level={4}>Sample Metadata Fields</Heading>
        <Box direction="row">
          {data.SearchCardBody.meta_fields.map((d, i) => (
            <Text key={d}>{(i ? ', ' : '') + d + i}</Text>
          ))}
        </Box>
      </Section>
    </>
  )
}

export default SearchCardBody
