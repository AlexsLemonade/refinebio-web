import config from 'utils/config'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Col } from 'components/shared/Col'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { Row } from 'components/shared/Row'
import styled from 'styled-components'
import { CCDLxALSF } from '../../images/CCDL-x-ALSF.svg'

const PRubik = styled(Paragraph)`
  font-family: 'Rubik', sans-serif;
`

const HeroHeader = () => {
  const { viewport, setResponsive } = useResponsive()
  return (
    <Heading
      color="white"
      level={1}
      margin={{ bottom: 'xxxxxxlarge' }}
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
    <Box align="center" margin={{ top: setResponsive('medium', '0') }}>
      <Text
        color="brand"
        margin={{ bottom: setResponsive('xsmall', 'small') }}
        size={setResponsive('xxxlarge', 'xxxxlarge')}
      >
        {count}
      </Text>
      <Text size={setResponsive('medium', 'large')} textAlign="center">
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
        level={2}
        margin={{ bottom: setResponsive('0', 'xlarge') }}
        size={setResponsive('h2_xsmall', 'h2_large')}
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
          count={`${data.sample_count}M`}
          text="million samples available"
        />
        <HeroBodyCol
          count={`${data.organism_count}K`}
          text="Support for 3000 organisms"
        />
        <HeroBodyCol
          count={`${data.raw_data_count} TB`}
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
  img,
  ...props
}) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Row {...props} direction={setResponsive('column-reverse', direction)}>
      <Col
        align={setResponsive('center', 'start')}
        justify={setResponsive('start', 'center')}
      >
        <Heading
          level={2}
          margin={{ bottom: setResponsive('small', 'small') }}
          size={setResponsive('h2_small', 'h2_large')}
        >
          {heading}
        </Heading>
        <Paragraph>{body}</Paragraph>
      </Col>
      <Col
        align={setResponsive('center', align)}
        margin={{ bottom: 'small', right: setResponsive('0', 'large') }}
        aria-hidden
        background={{
          image: `url('${img}')`,
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        // to preserve the height of SVG image
        height={setResponsive('195px', '100%', '300px')}
      />
    </Row>
  )
}

const About = () => {
  const { links } = config
  const { viewport, setResponsive } = useResponsive()

  return (
    <>
      <Box
        pad={{
          top: 'xxxxxxxlarge',
          bottom: setResponsive('xxxlarge', 'xxxlarge', 'xxxxxlarge')
        }}
      >
        <FixedContainer>
          <Hero
            header={<HeroHeader />}
            body={<HeroBody />}
            marginBottom="xlarge"
          />
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
              img="illustration-saving-time.svg"
              margin={{ right: 'xxxlarge' }}
            />
          </Row>
          <Row margin={{ top: setResponsive('xlarge', 'xxxxxxxlarge') }}>
            <LayerRow1
              align="start"
              direction="row-reverse"
              heading="One Language, One Repository"
              body="It’s the Rosetta Stone for the vast amount of publicly available childhood 
              cancer data. It’s the first project of its kind to harmonize this information across 
              many different technologies into one universal repository. Now researchers can pull 
              from this massive dataset, saving precious time."
              img="illustration-one-repo.svg"
              margin={{ right: 'xxxlarge' }}
            />
          </Row>
          <Row margin={{ top: setResponsive('xlarge', 'xxxxxxxlarge') }}>
            <LayerRow1
              heading="Better Medicine Through Machine Learning"
              body="With the power of machine learning and the rich collection of data in refine.bio, 
              researchers have the potential to extract more information about the biology of a patient’s 
              sample. In turn researchers will be able to better classify patients and identify what types 
              of treatments might be most effective on a case-by-case basis, further enhancing the 
              burgeoning field of precision medicine."
              img="illustration-network-bottle.svg"
              margin={{ right: 'xxxlarge' }}
            />
          </Row>
        </FixedContainer>
      </Box>
      <Box>
        <FixedContainer
          border={{ color: 'gray-shade-5', side: 'top', size: 'large' }}
          pad={{
            horizontal: setResponsive('large', 'medium', '0'),
            top: setResponsive('xxxlarge', 'xxxlarge', 'xxxxxlarge'),
            bottom: setResponsive('xxxlarge', 'xxxlarge', 'xxxxxxxlarge')
          }}
        >
          <Row margin={{ bottom: 'xlarge' }}>
            <Paragraph size="xxlarge" textAlign="center">
              Created by the Childhood Cancer Data Lab (CCDL), powered by Alex’s
              Lemonade Stand {viewport !== 'small' && <br />} Foundation, this
              endeavor is harnessing the power of big data to accelerate the
              pace of potential cures.
            </Paragraph>
          </Row>
          <Row align="center" justify="center" margin={{ bottom: 'xlarge' }}>
            <CCDLxALSF />
          </Row>
          <Row
            justify={setResponsive('', 'around')}
            elevation="xlarge"
            pad={{
              horizontal: setResponsive('medium', 'medium', '122px'),
              vertical: setResponsive('medium', 'xlarge')
            }}
            round="8px"
          >
            <Box justify="center" width={setResponsive('auto', '500px')}>
              <Paragraph size={setResponsive('large', 'xxlarge')}>
                Donate today to support the CCDL’s efforts to give researchers
                the tools to create a healthier, more prosperous future for kids
                fighting cancer and beyond.
              </Paragraph>
            </Box>
            <Box
              justify="center"
              margin={{ top: setResponsive('medium', '0') }}
            >
              <Button
                label="Donate Now"
                large
                href={links.donate}
                rel="noopener noreferrer"
                target="_blank"
                primary
                responsive
                uppercase
              />
            </Box>
          </Row>
        </FixedContainer>
      </Box>
    </>
  )
}

export default About
