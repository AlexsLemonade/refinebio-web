import { Box, Heading } from 'grommet'
import gtag from 'analytics/gtag'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/Anchor'
import { Column } from 'components/Column'
import { List } from 'components/List'
import { Row } from 'components/Row'
import { links } from 'config'

const ListItem = ({ href, text }) => (
  <Box as="li" margin={{ bottom: 'small' }}>
    <Anchor
      href={href}
      label={text}
      onClick={() => gtag.trackExploredUsageClick(href)}
    />
  </Box>
)

export const CompendiaExplore = ({ type }) => {
  const { setResponsive } = useResponsive()

  const isNormalized = type === 'normalized'
  const linkText = `Learn how the normalized ${
    isNormalized ? 'normalized' : 'RNA-seq'
  } compendia are created`
  const linkHerf = isNormalized
    ? links.refinebio_docs_learn_how_the_normalized_compendia_are_created
    : links.refinebio_docs_learn_how_the_rna_seq_compendia_are_created

  const exploreLinks = [
    {
      text: 'Get started with the refine.bio compendia',
      href: links.refinebio_docs_getting_started_with_refinebio_compendia
    },
    {
      text: linkText,
      href: linkHerf
    },
    {
      text: 'See our exploratory analyses in test species compendia',
      href: links.refinebio_github_compendium_processing
    }
  ]

  return (
    <Row
      border={{ side: 'top' }}
      justify="center"
      pad={{
        top: setResponsive('xlarge', 'xlarge', 'basex6'),
        horizontal: 'medium'
      }}
    >
      <Column
        align="center"
        margin={{
          right: setResponsive('none', 'xlarge', 'none')
        }}
      >
        <Box
          margin={{ bottom: 'small' }}
          aria-hidden
          background={{
            image: "url('/tubey-adventure.svg')",
            position: 'center left',
            repeat: 'no-repeat',
            size: 'contain'
          }}
          // to preserve the dimension of SVG image
          height={setResponsive('250px', '350px', '450px')}
          width={setResponsive('250px', '350px', '400px')}
        />
      </Column>
      <Column pad={{ top: setResponsive('none', 'basex7', 'basex9') }}>
        <Heading level={2} margin={{ bottom: 'small' }}>
          Explore what you can do with the species compendia!
        </Heading>
        <List alignItems="start" flexDirection="column">
          {exploreLinks.map((link) => (
            <ListItem key={link.text} href={link.href} text={link.text} />
          ))}
        </List>
      </Column>
    </Row>
  )
}

export default CompendiaExplore
