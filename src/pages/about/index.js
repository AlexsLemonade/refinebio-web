import config from 'utils/config'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Col } from 'components/shared/Col'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { Row } from 'components/shared/Row'
import { SVGSavingTime } from '../../images/illustration-saving-time.svg'
import { SVGOneRepo } from '../../images/illustration-one-repo.svg'
import { SVGNetworkBottle } from '../../images/illustration-network-bottle.svg'
import { CCDLxALSF } from '../../images/CCDL-x-ALSF.svg'

const HeroHeader = () => {
  const { viewport, setResponsive } = useResponsive()
  return (
    <Heading
      color="white"
      level={1}
      margin={{ bottom: setResponsive('large', 'xxxlarge') }}
      size={setResponsive('h1_small', 'h1_xlarge')}
      textAlign="center"
    >
      Fighting childhood cancer, {viewport !== 'small' && <br />}thousands of
      datasets at a time
    </Heading>
  )
}

const HeroBodyCol = ({ count, text }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center" margin={{ top: setResponsive('large', '0') }}>
      <Text
        margin={{ bottom: setResponsive('xsmall', 'small') }}
        size={setResponsive('32px', '36px')}
      >
        <Anchor href="#url" label={`${count}M`} />
      </Text>
      <Text size={setResponsive('small', 'large')} textAlign="center">
        {count} {text}
      </Text>
    </Box>
  )
}
const HeroBody = () => {
  const { setResponsive } = useResponsive()
  // TEMP
  const data = {
    gene_count: 60000,
    sample_count: 1.5,
    organism_count: 3,
    raw_data_count: 11.7
  }

  return (
    <>
      <Heading
        level={1}
        margin={{ bottom: setResponsive('0', 'xlarge') }}
        size={setResponsive('h1_small', 'h1_large')}
        textAlign="center"
      >
        refine.bio has harmonized over {data.gene_count.toLocaleString()} gene
        expression experiments
      </Heading>

      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        width="100%"
      >
        <HeroBodyCol
          count={data.sample_count}
          text="million samples available"
        />
        <HeroBodyCol
          count={data.organism_count}
          text="Support for 3000 organisms"
        />
        <HeroBodyCol
          count={data.raw_data_count}
          text="terabytes of raw data processed"
        />
      </Box>
    </>
  )
}

// Columns for each layer
// 1st Layer
const LayerRow1 = ({
  align = 'end',
  direction = 'row',
  heading,
  body,
  svg,
  ...props
}) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Row {...props} direction={setResponsive('column', direction)}>
      <Col
        align={setResponsive('center', 'start')}
        justify={setResponsive('start', 'center')}
      >
        <Heading
          level={2}
          margin={{ bottom: setResponsive('medium', 'small') }}
          size={setResponsive('h2_xsmall', 'h2_large')}
          weight={setResponsive(500, 'normal')}
        >
          {heading}
        </Heading>
        <Paragraph>{body}</Paragraph>
      </Col>
      <Col>
        <Box
          align={setResponsive('center', align)}
          margin={{ bottom: 'small', right: 'large' }}
          aria-hidden
        >
          {svg}
        </Box>
      </Col>
    </Row>
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

const About = () => {
  const { links } = config
  const { setResponsive } = useResponsive()

  return (
    <>
      <Box
        pad={{
          top: setResponsive('xxxlarge', 'xxxlarge', 'xxxxxxlarge'),
          bottom: setResponsive('xlarge', 'xlarge', 'xxxxxxxlarge')
        }}
      >
        <FixedContainer>
          <Hero header={<HeroHeader />} body={<HeroBody />} />
          <Row>
            <LayerRow1
              heading="Saving Time to Save Lives"
              body="When childhood cancer researchers download transcriptome data 
              (the collection of RNA molecules in a cell), each set can seem like its 
              own language. Different studies use distinct technologies to collect the 
              same type of data, and each technology has its own language. Researchers 
              can spend up to 30% of their time translating these datasets into something 
              they can use. This cumbersome process takes away valuable resources that 
              could be spent in the lab discovering cutting-edge treatments and cures. 
              refine.bio is here to fix that."
              svg={<SVGSavingTime />}
              margin={{ right: 'xxxlarge' }}
            />
          </Row>
          <Row>
            <LayerRow1
              align="start"
              direction="row-reverse"
              heading="One Language, One Repository"
              body="It’s the Rosetta Stone for the vast amount of publicly available childhood 
              cancer data. It’s the first project of its kind to harmonize this information across 
              many different technologies into one universal repository. Now researchers can pull 
              from this massive dataset, saving precious time."
              svg={<SVGOneRepo />}
              margin={{ right: 'xxxlarge' }}
            />
          </Row>
          <Row>
            <LayerRow1
              heading="Better Medicine Through Machine Learning"
              body="With the power of machine learning and the rich collection of data in refine.bio, 
              researchers have the potential to extract more information about the biology of a patient’s 
              sample. In turn researchers will be able to better classify patients and identify what types 
              of treatments might be most effective on a case-by-case basis, further enhancing the 
              burgeoning field of precision medicine."
              svg={<SVGNetworkBottle />}
              margin={{ right: 'xxxlarge' }}
            />
          </Row>
        </FixedContainer>
      </Box>

      {/* 3rd Layer */}
      <Box>
        <FixedContainer
          border={{ color: 'gray-shade-5', side: 'top', size: 'large' }}
          pad={{
            horizontal: setResponsive('large', 'medium', 'xxxxxlarge'),
            vertical: setResponsive('xxlarge', 'xxlarge', 'xxxxxlarge')
          }}
        >
          <Row>
            <Paragraph size="xxlarge">
              Created by the Childhood Cancer Data Lab (CCDL), powered by Alex’s
              Lemonade Stand Foundation, this endeavor is harnessing the power
              of big data to accelerate the pace of potential cures.
            </Paragraph>
          </Row>
          <Row align="center" justify="center">
            <CCDLxALSF />
          </Row>
          <Row elevation="xlarge">
            <Col>
              <Paragraph size="xxlarge">
                Donate today to support the CCDL’s efforts to give researchers
                the tools to create a healthier, more prosperous future for kids
                fighting cancer and beyond.
              </Paragraph>
            </Col>
            <Col>
              <Button label="Donate Now" primary responsive uppercase />
            </Col>
          </Row>
        </FixedContainer>
      </Box>
    </>
  )
}

export default About
