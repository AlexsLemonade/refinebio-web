import { Box, Heading } from 'grommet'
import gtag from 'api/analytics/gtag'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { List } from 'components/shared/List'
import { Row } from 'components/shared/Row'
import { links } from 'config'

const ListItem = ({ text, href }) => {
  const handleGAEvents = () => {
    gtag.exploredUsageClick(text, 'compendia')
    gtag.outboundClick(href, `${text} - Explore Compendia`)
  }

  return (
    <Box as="li" margin={{ bottom: 'small' }}>
      <Anchor href={href} label={text} onClick={handleGAEvents} />
    </Box>
  )
}

export const Explore = () => {
  const { setResponsive } = useResponsive()

  const exploreLinks = [
    {
      text: ' Get started with the species compendia',
      href: links.refinebio_docs_getting_started_with_species_compendia
    },
    {
      text: 'Learn how the species compendia are created',
      href: links.refinebio_docs_species_compendia
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

export default Explore
