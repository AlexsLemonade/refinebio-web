import config from 'utils/config'
import { useResponsive } from 'hooks/useResponsive'
import Link from 'next/link'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Col } from 'components/shared/Col'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { Row } from 'components/shared/Row'
import { SearchBox } from 'components/shared/SearchBox'
import { FolderIcon } from '../images/graphic-folder.svg'
import { HeadMapIcon } from '../images/graphic-heatmap.svg'
import { PathwayIcon } from '../images/graphic-pathway.svg'
import { SearchIcon } from '../images/graphic-search.svg'
import { WaySignsIcon } from '../images/graphic-way-signs.svg'

const HeroContent = () => {
  const { setResponsive } = useResponsive()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']

  return (
    <>
      <Heading
        level={1}
        margin={{ bottom: setResponsive('large', 'medium') }}
        size="large"
        textAlign={setResponsive('center', 'start')}
      >
        Search for normalized transcriptome data
      </Heading>
      <SearchBox
        btnWidth={setResponsive('100%', '120px')}
        size="xlarge"
        placeHolder={setResponsive(
          'Search accessions, pathways, etc.,',
          'Search accessions, pathways, diseases, etc.,'
        )}
        primary
      />
      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        margin={{ top: setResponsive('32px', 'medium') }}
        width="100%"
      >
        <Text size="large">Try searching for:</Text>
        {queries.map((query) => (
          <Text
            key={query}
            size="large"
            margin={{ top: setResponsive('small') }}
          >
            <Link href={{ pathname: '/search', query: { query } }} size="large">
              {query}
            </Link>
          </Text>
        ))}
      </Box>
    </>
  )
}

const Home = () => {
  const { links } = config
  const { setResponsive } = useResponsive()

  return (
    <>
      {/* 1st Row */}
      <Box
        pad={{
          top: setResponsive('xxxlarge', 'xxxlarge', 'xxxxxxxlarge'),
          bottom: setResponsive('xlarge', 'xlarge', 'xxxxxxxlarge')
        }}
      >
        <FixedContainer>
          <Hero body={<HeroContent />} />
          <Row>
            <Col>
              <Row>
                <Box margin={{ right: 'large' }}>
                  <SearchIcon />
                </Box>
                <Col flexValue="1">
                  <Heading level={1} margin={{ bottom: 'small' }}>
                    Find the data you need
                  </Heading>
                  <Paragraph size="large">
                    Search the multi-organism collection of genome wide gene
                    expression data obtained from publicly available sources
                    like GEO, ArrayExpress, and SRA. The data has been processed
                    uniformly and normalized using a set of{' '}
                    <Anchor
                      href={links.standard_pipeline}
                      label="standardized pipelines"
                      rel="noopener noreferrer"
                    />{' '}
                    curated by the{' '}
                    <Anchor
                      href={links.ccdl}
                      label="Childhood Cancer Data Lab (CCDL)"
                      rel="noopener noreferrer"
                    />
                  </Paragraph>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Box margin={{ right: 'large' }}>
                  <FolderIcon />
                </Box>
                <Col flexValue="1">
                  <Heading level={1} margin={{ bottom: 'small' }}>
                    Create custom datasets
                  </Heading>
                  <Paragraph size="large">
                    Build and download custom datasets tailored to your needs
                    including gene expression matrices and sample metadata.
                  </Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
        </FixedContainer>
      </Box>
      {/* 2st Row */}
      <Box
        background="gradient_dark"
        pad={{ vertical: setResponsive('large', 'xxlarge', 'xxxxxxlarge') }}
      >
        <FixedContainer>
          <Row>
            <Paragraph
              color="white"
              size="xlarge"
              textAlign="center"
              margin={{
                bottom: setResponsive('large', 'xlarge', 'xxxxxxlarge')
              }}
            >
              You can use refine.bio datasets for preliminary assessment of
              biological signals and to accelerate validation of your research
              findings.
            </Paragraph>
          </Row>
          <Row>
            <Col background="white" pad={setResponsive('medium', 'small')}>
              <Box height="56px" margin={{ bottom: 'medium' }}>
                <WaySignsIcon />
              </Box>
              <Heading level={2} margin={{ bottom: 'small' }} weight="700">
                Get Started using refine.bio data
              </Heading>
              <Paragraph>
                Explore the different ways you can use refine.bio data to help
                with your scientific questions.
              </Paragraph>
              <Box align="center">
                <Button label="Get Started" secondary />
              </Box>
            </Col>
            <Col
              background="white"
              margin={{ left: setResponsive('0', '40px') }}
              pad={setResponsive('medium', 'small')}
            >
              <Box height="56px" margin={{ bottom: 'medium' }}>
                <HeadMapIcon />
              </Box>
              <Heading level={2} margin={{ bottom: 'small' }} weight="700">
                Get Started using refine.bio data
              </Heading>
              <Paragraph>
                Learn how you can do differential expression analysis with
                refine.bio datasets.
              </Paragraph>
              <Box align="center">
                <Button label="RNA-seq Example" secondary />
                <Button label="Microarray Example" secondary />
              </Box>
            </Col>
            <Col
              background="white"
              margin={{ left: setResponsive('0', '40px') }}
              pad={setResponsive('medium', 'small')}
            >
              <Box height="56px" margin={{ bottom: 'medium' }}>
                <PathwayIcon />
              </Box>
              <Heading level={2} margin={{ bottom: 'small' }} weight="700">
                Get Started using refine.bio data
              </Heading>
              <Paragraph>
                Learn how you can use refine.bio data to identify pathways that
                are active in your biological condition of interest.
              </Paragraph>
              <Box align="center">
                <Button label="RNA-seq Example" secondary />
                <Button label="Microarray Example" secondary />
              </Box>
            </Col>
          </Row>
        </FixedContainer>
      </Box>
      {/* 3rd Row */}
      <Box pad={{ vertical: setResponsive('large', 'xxlarge', 'xxxxxxlarge') }}>
        <FixedContainer>
          <Row>
            <Col
              background={{
                image: " url('network.svg')",
                position: 'bottom right',
                repeat: 'no-repeat'
              }}
              elevation="medium"
              height="320px"
              pad={{
                horizontal: setResponsive('large', 'xxlarge', 'xxxlarge'),
                vertical: setResponsive('large', 'xlarge')
              }}
            >
              <Heading
                level={1}
                margin={{ bottom: setResponsive('medium', 'small') }}
              >
                refine.bio Compendia
              </Heading>
              <Paragraph>
                refine.bio compendia are collections of samples that have been
                processed and packaged for broad and felxible use.
              </Paragraph>
              <Box>
                <Button label="Learn More" secondary />
              </Box>
            </Col>
            <Col
              background={{
                image: " url('undraw_files.svg')",
                position: 'bottom right',
                repeat: 'no-repeat'
              }}
              elevation="medium"
              height="320px"
              pad={{
                horizontal: setResponsive('large', 'xxlarge', 'xxxlarge'),
                vertical: setResponsive('large', 'xlarge')
              }}
              margin={{ left: setResponsive('0', 'xlarge') }}
            >
              <Heading
                level={1}
                margin={{ bottom: setResponsive('medium', 'small') }}
              >
                Explore the docs
              </Heading>
              <Paragraph>
                refine.bio compendia are collections of samples that have been
                processed and packaged for broad and felxible use.
              </Paragraph>
              <Box>
                <Button label="Take me to the docs" secondary />
              </Box>
            </Col>
          </Row>
        </FixedContainer>
      </Box>
      {/* 4th Row */}
      <Box
        background="gradient_dark"
        pad={{ vertical: setResponsive('large', 'xxlarge', '148px') }}
      >
        <FixedContainer align="center">
          <Heading
            level={1}
            color="white"
            margin={{ bottom: setResponsive('large', 'medium') }}
          >
            Sign Up for Updates
          </Heading>
          <Paragraph
            color="white"
            margin={{ bottom: setResponsive('large', 'medium') }}
            size="large"
          >
            Be the first one to know about new features, compendia releases and
            more!
          </Paragraph>
          <SearchBox
            placeHolder="jdoe@example.com"
            secondary
            size="large"
            width="560px" // fixed value to preserve the UI layout for wider screens
          />
        </FixedContainer>
      </Box>
    </>
  )
}

export default Home
