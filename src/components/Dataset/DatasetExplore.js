import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { List } from 'components/shared/List'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import mock from 'api/mockDataExperiment'

const ListItem = ({ text, href }) => (
  <Box as="li" margin={{ bottom: 'small' }}>
    <Anchor href={href} label={text} />
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const DatasetExplore = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  // check technology and render links based on it
  // const { experiments } = dataset
  const experiments = mock[0].samples // TEMPORARY
  const technologies = Object.values(experiments).map((e) => e.technology)
  const hasRNASeq = technologies.includes('RNA-SEQ')
  const hasMicroarray = technologies.includes('MICROARRAY')
  const isMixed = hasRNASeq && hasMicroarray

  const rnaSeqLinks = [
    {
      text: 'Convert ENSEMBL IDs to Gene Symbols',
      href: links.refinebio_github_gene_id_annotation
    },
    {
      text: 'Follow an example differential expression analysis',
      href: links.refinebio_github_differential_expression_rnaseq
    },
    {
      text: 'Follow a example pathway analysis',
      href: links.refinebio_github_pathway_analysis_rnaseq
    },
    {
      text: 'See what other analyses you can do with refine.bio data',
      href: links.refinebio_github_example
    }
  ]
  const microarrayLinks = [
    {
      text: 'Convert ENSEMBL IDs to Gene Symbols',
      href: links.refinebio_github_gene_id_annotation_microarray
    },
    {
      text: 'Follow an example differential expression analysis',
      href: links.refinebio_github_differential_expression_microarray
    },
    {
      text: 'Follow a example pathway analysis',
      href: links.refinebio_github_pathway_analysis_microarray
    },
    {
      text: 'See what other analyses you can do with refine.bio data',
      href: links.refinebio_github_example
    }
  ]

  const mixedLinks = [
    {
      text: 'Convert ENSEMBL IDs to Gene Symbols for microarray data',
      href: links.refinebio_github_gene_id_annotation_microarray
    },
    {
      text: 'Convert ENSEMBL IDs to Gene Symbols for RNA-seq data',
      href: links.refinebio_github_gene_id_annotation_rnaseq
    },
    {
      text: 'Follow an example differential expression analysis for microarray data',
      href: links.refinebio_github_differential_expression_microarray
    },
    {
      text: 'Follow an example differential expression analysis for RNA-seq data',
      href: links.refinebio_github_differential_expression_rnaseq
    },
    {
      text: 'See what other analyses you can do with refine.bio data',
      href: links.refinebio_github_example
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
        flexValue={setResponsive('1 1 auto', 'auto')}
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
      <Column
        flexValue={setResponsive('1 1 auto', 'auto')}
        pad={{ top: setResponsive('none', 'basex7', 'basex9') }}
      >
        <Heading
          level={2}
          margin={{ bottom: 'small' }}
          size={setResponsive('h2_small', 'h2_large')}
        >
          Explore what you can do with your refine.bio dataset!
        </Heading>
        <List alignItems="start" flexDirection="column">
          {isMixed &&
            mixedLinks.map((link) => (
              <ListItem key={link.text} href={link.href} text={link.text} />
            ))}
          {!isMixed &&
            hasMicroarray &&
            microarrayLinks.map((link) => (
              <ListItem key={link.text} href={link.href} text={link.text} />
            ))}
          {!isMixed &&
            hasRNASeq &&
            rnaSeqLinks.map((link) => (
              <ListItem key={link.text} href={link.href} text={link.text} />
            ))}
        </List>
      </Column>
    </Row>
  )
}

export default DatasetExplore