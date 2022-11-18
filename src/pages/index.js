import config from 'config/'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { TextInput } from 'components/shared/TextInput'
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
        margin={{ bottom: setResponsive('medium', 'medium', 'xlarge') }}
        size={setResponsive('h1_small', 'h1_large')}
        textAlign="center"
      >
        Search for normalized transcriptome data
      </Heading>
      <SearchBox
        size="xlarge"
        placeHolder={setResponsive(
          'Search data',
          'Search accessions, pathways, diseases, etc.,'
        )}
        primary
        responsive
      />
      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        margin={{ top: setResponsive('large', 'large', 'xlarge') }}
        width="100%"
      >
        <Text size="xlarge">Try searching for:</Text>

        {queries.map((query) => (
          <Text
            key={query}
            size="large"
            margin={{ top: setResponsive('small') }}
          >
            <Anchor
              label={query}
              href={{ pathname: '/search', query: { query } }}
              size="xlarge"
              underline
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
    <Column
      flexValue={setResponsive('1 1 auto', '1 1 auto', '1 1 0')}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Row>
        <Box margin={{ bottom: 'small', right: 'large' }} aria-hidden>
          {svgIcon}
        </Box>
        <Column>
          <Heading
            level={2}
            margin={{ bottom: 'small' }}
            size={setResponsive('h2_small', 'h2_large')}
          >
            {heading}
          </Heading>
          <Paragraph size={setResponsive('medium', 'large', 'large')}>
            {body}
          </Paragraph>
        </Column>
      </Row>
    </Column>
  )
}
// 2nd Layer
const LayerCol2 = ({ heading, body, footer, svgIcon, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      background="white"
      pad={setResponsive('large', 'medium')}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Box height="xxxlarge" margin={{ bottom: 'medium' }} aria-hidden>
        {svgIcon}
      </Box>
      <Heading
        level={4}
        margin={{ bottom: 'small' }}
        size="h4_small"
        weight="500"
      >
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box align="center" margin={{ top: setResponsive('large', 'medium') }}>
        {footer}
      </Box>
    </Column>
  )
}
// 3rd Layer
const LayerCol3 = ({ heading, body, footer, img, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
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
        bottom: setResponsive('large', 'xlarge', 'basex8')
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Heading level={1} margin={{ bottom: setResponsive('medium', 'small') }}>
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box margin={{ top: setResponsive('large', 'medium') }}>{footer}</Box>
    </Column>
  )
}

const Home = () => {
  const { links } = config
  const { viewport, setResponsive } = useResponsive()

  return (
    <>
      {/* 1st Layer */}
      <Box
        pad={{
          top: setResponsive('xxxlarge', 'xxxlarge', 'basex10'),
          bottom: setResponsive('xlarge', 'xlarge', 'basex12')
        }}
      >
        <FixedContainer>
          {/* fixed width to preserve UI layout in wider screens */}
          <Hero
            body={<HeroBody />}
            boxPadding={{
              horizontal: setResponsive('large', 'basex12'),
              vertical: setResponsive('large', 'basex8')
            }}
            boxWidth="815px"
          />
          <Row direction={setResponsive('column', 'column', 'row')}>
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
                    target="_blank"
                  />{' '}
                  curated by the{' '}
                  <Anchor
                    href={links.ccdl}
                    label="Childhood Cancer Data Lab (CCDL)"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                </>
              }
              svgIcon={<SearchIcon />}
              margin={{ right: setResponsive('0', '0', 'basex9') }}
            />
            {viewport === 'large' && (
              <Box
                border={{ color: 'gray-shade-5', side: 'left', size: 'large' }}
              />
            )}
            <LayerCol1
              heading="Create custom datasets"
              body="Build and download custom datasets tailored to your needs
              including gene expression matrices and sample metadata."
              svgIcon={<FolderIcon />}
              margin={{
                top: setResponsive('xxxlarge', '0'),
                left: setResponsive('0', '0', 'basex9')
              }}
              pad={{
                top: setResponsive('0', 'xlarge', '0')
              }}
            />
          </Row>
        </FixedContainer>
      </Box>
      {/* 2st Layer */}
      <Box
        background="gradient_blue_dark"
        pad={{ vertical: setResponsive('medium', 'xxlarge', 'basex10') }}
      >
        <FixedContainer
          pad={{ horizontal: setResponsive('medium', 'medium', 'basex8') }}
        >
          <Row
            margin={{
              bottom: setResponsive('medium', 'xlarge', 'basex10')
            }}
          >
            <Paragraph
              color="white"
              size={setResponsive('xlarge', 'xxlarge')}
              textAlign="center"
            >
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
              margin={{ bottom: setResponsive('large', '0') }}
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
              margin={{
                left: setResponsive('0', 'medium', 'xlarge'),
                bottom: setResponsive('large', '0')
              }}
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
              margin={{
                left: setResponsive('0', 'medium', 'xlarge')
              }}
            />
          </Row>
        </FixedContainer>
      </Box>
      {/* 3rd Layer */}
      <Box pad={{ vertical: setResponsive('xlarge', 'xxlarge', 'basex10') }}>
        <FixedContainer
          pad={{ horizontal: setResponsive('large', 'medium', 'basex9') }}
        >
          <Row>
            <LayerCol3
              heading="refine.bio Compendia"
              body="refine.bio compendia are collections of samples that have been
                processed and packaged for broad and felxible use."
              footer={<Button label="Learn More" secondary responsive />}
              img="network.svg"
              margin={{ bottom: setResponsive('large', '0') }}
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
        background="gradient_blue_dark"
        pad={{ vertical: setResponsive('medium', 'xxxlarge', '140px') }}
      >
        <FixedContainer align="center">
          <Heading level={1} color="white" margin={{ bottom: 'medium' }}>
            Sign Up for Updates
          </Heading>
          <Paragraph
            color="white"
            margin={{ bottom: 'small' }}
            textAlign="center"
            size="large"
          >
            Be the first one to know about new features, compendia releases and
            more!
          </Paragraph>
          {/* fixed width to preserve UI layout in wider screens */}
          <Row width="500px">
            <Column>
              <TextInput placeholder="jdoe@example.com" />
            </Column>
            <Button
              label="Sign up"
              margin={{
                left: setResponsive('0', 'small'),
                top: setResponsive('small', '0')
              }}
              secondary
              responsive
            />
          </Row>
        </FixedContainer>
      </Box>
    </>
  )
}

export default Home
