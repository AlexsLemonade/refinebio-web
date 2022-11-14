import config from 'utils/config'
import { useResponsive } from 'hooks/useResponsive'
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

const HeroBody = () => {
  const { setResponsive } = useResponsive()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']

  return (
    <>
      <Heading
        level={1}
        margin={{ bottom: setResponsive('large', 'medium') }}
        size={setResponsive('h1_small', 'h1_large')}
        textAlign="center"
      >
        Search for normalized transcriptome data
      </Heading>
      <SearchBox
        size="xlarge"
        placeHolder={setResponsive(
          'Search accessions, pathways, etc.,',
          'Search accessions, pathways, diseases, etc.,'
        )}
        primary
        responsive
      />
      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        margin={{ top: setResponsive('large', 'medium') }}
        width="100%"
      >
        <Text size="large">Try searching for:</Text>

        {queries.map((query) => (
          <Text
            key={query}
            size="large"
            margin={{ top: setResponsive('small') }}
          >
            <Anchor
              defaultUnderline
              label={query}
              href={{ pathname: '/search', query: { query } }}
              size="large"
            />
          </Text>
        ))}
      </Box>
    </>
  )
}

// Columns for each layer
// 1st Layer
const LayerCol1 = ({ heading, body, svgIcon, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Col {...props}>
      <Row>
        <Box margin={{ bottom: 'small', right: 'large' }} aria-hidden>
          {svgIcon}
        </Box>
        <Col>
          <Heading
            level={2}
            margin={{ bottom: setResponsive('medium', 'small') }}
            size={setResponsive('h2_small', 'h2_large')}
          >
            {heading}
          </Heading>
          <Paragraph size="large">{body}</Paragraph>
        </Col>
      </Row>
    </Col>
  )
}
// 2nd Layer
const LayerCol2 = ({ heading, body, footer, svgIcon, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Col background="white" pad={setResponsive('large', 'medium')} {...props}>
      <Box height="xxxlarge" margin={{ bottom: 'medium' }} aria-hidden>
        {svgIcon}
      </Box>
      <Heading
        level={4}
        margin={{ bottom: 'small' }}
        size={setResponsive('h4_small', 'medium')}
        weight="500"
      >
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box align="center" margin={{ top: setResponsive('large', 'medium') }}>
        {footer}
      </Box>
    </Col>
  )
}
// 3rd Layer
const LayerCol3 = ({ heading, body, footer, img, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Col
      background={{
        image: `url('${img}')`,
        position: 'bottom right',
        repeat: 'no-repeat',
        size: '100%'
      }}
      elevation="medium"
      pad={{
        horizontal: setResponsive('large', 'xxlarge', 'xxxlarge'),
        top: setResponsive('large', 'xlarge'),
        bottom: setResponsive('large', 'xlarge', 'xxxxlarge')
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Heading level={1} margin={{ bottom: setResponsive('medium', 'small') }}>
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box margin={{ top: setResponsive('large', 'medium') }}>{footer}</Box>
    </Col>
  )
}

const Home = () => {
  const { links } = config
  const { setResponsive } = useResponsive()

  return (
    <>
      {/* 1st Layer */}
      <Box
        pad={{
          top: setResponsive('xxxlarge', 'xxxlarge', 'xxxxxxlarge'),
          bottom: setResponsive('xlarge', 'xlarge', 'xxxxxxxlarge')
        }}
      >
        <FixedContainer>
          <Hero body={<HeroBody />} />
          <Row>
            <LayerCol1
              heading=" Find the data you need"
              body={
                <>
                  Search the multi-organism collection of genome wide gene
                  expression data obtained from publicly available sources like
                  GEO, ArrayExpress, and SRA. The data has been processed
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
                </>
              }
              svgIcon={<SearchIcon />}
              margin={{ right: 'xxxlarge' }}
            />
            <LayerCol1
              heading="Create custom datasets"
              body="Build and download custom datasets tailored to your needs
              including gene expression matrices and sample metadata."
              svgIcon={<FolderIcon />}
              margin={{
                top: setResponsive('500px', '0'),
                left: setResponsive('', 'medium', 'xxxlarge')
              }}
              pad={{
                top: setResponsive('large', '0')
              }}
            />
          </Row>
        </FixedContainer>
      </Box>
      {/* 2st Layer */}
      <Box
        background="gradient_dark"
        pad={{ vertical: setResponsive('large', 'xxlarge', 'xxxxxxlarge') }}
      >
        <FixedContainer
          pad={{ horizontal: setResponsive('large', 'medium', 'xxxxlarge') }}
        >
          <Row
            margin={{
              bottom: setResponsive('large', 'xlarge', 'xxlarge')
            }}
          >
            <Paragraph color="white" size="xlarge" textAlign="center">
              You can use refine.bio datasets for preliminary assessment of
              biological signals and to accelerate validation of your research
              findings.
            </Paragraph>
          </Row>
          <Row>
            <LayerCol2
              heading="Get Started using refine.bio data"
              body="Explore the different ways you can use refine.bio data to help
                with your scientific questions."
              footer={<Button label="Get Started" secondary responsive />}
              svgIcon={<WaySignsIcon />}
            />
            <LayerCol2
              heading="Differential Expression Analysis"
              body="Learn how you can do differential expression analysis with refine.bio datasets."
              footer={
                <>
                  <Button label="RNA-seq Example" secondary responsive />
                  <Button
                    label="Microarray Example"
                    margin={{ top: setResponsive('small', 'medium') }}
                    secondary
                    responsive
                  />
                </>
              }
              svgIcon={<HeadMapIcon />}
              margin={{ left: setResponsive('0', 'medium', 'xlarge') }}
            />
            <LayerCol2
              heading="Pathway Analysis"
              body="Learn how you can use refine.bio data to identify pathways that are active in your biological condition of interest."
              footer={
                <>
                  <Button label="RNA-seq Example" secondary responsive />
                  <Button
                    label="Microarray Example"
                    margin={{ top: setResponsive('small', 'medium') }}
                    secondary
                    responsive
                  />
                </>
              }
              svgIcon={<PathwayIcon />}
              margin={{ left: setResponsive('0', 'medium', 'xlarge') }}
            />
          </Row>
        </FixedContainer>
      </Box>
      {/* 3rd Layer */}
      <Box pad={{ vertical: setResponsive('large', 'xxlarge', 'xxxxxxlarge') }}>
        <FixedContainer
          pad={{ horizontal: setResponsive('large', 'medium', 'xxxxxlarge') }}
        >
          <Row>
            <LayerCol3
              heading="refine.bio Compendia"
              body="refine.bio compendia are collections of samples that have been
                processed and packaged for broad and felxible use."
              footer={<Button label="Learn More" secondary responsive />}
              img="network.svg"
            />
            <LayerCol3
              heading="Explore the docs"
              body="Learn about how we source and process data and other downstream 
              analyses you can do with refine.bio data."
              footer={
                <Button label="Take me to the docs" secondary responsive />
              }
              img="undraw_files.svg"
              margin={{ left: setResponsive('0', 'large', 'xxxlarge') }}
            />
          </Row>
        </FixedContainer>
      </Box>
      {/* 4th Layer */}
      <Box
        background="gradient_dark"
        pad={{ vertical: setResponsive('xlarge', 'xxxlarge', 'xxxxxxxlarge') }}
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
            textAlign="center"
            size="large"
          >
            Be the first one to know about new features, compendia releases and
            more!
          </Paragraph>
          <SearchBox
            placeHolder="jdoe@example.com"
            responsive
            secondary
            size="large"
            wrapperWidth={setResponsive('', '60%', '45%')}
          />
        </FixedContainer>
      </Box>
    </>
  )
}

export default Home
