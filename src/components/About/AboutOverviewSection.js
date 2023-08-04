import { Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'

const Card = ({
  align = 'end',
  direction = 'row',
  heading,
  body,
  img: { url, position },
  ...props
}) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column-reverse', direction)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Column
        align={setResponsive('center', 'start')}
        justify={setResponsive('start', 'center')}
      >
        <Heading
          level={2}
          margin={{ bottom: 'small' }}
          size={setResponsive('small', 'large')}
        >
          {heading}
        </Heading>
        <Paragraph>{body}</Paragraph>
      </Column>
      <Column
        align={setResponsive('center', align)}
        aria-hidden
        basis={setResponsive('auto', 'full')}
        background={{
          image: `url('${url}')`,
          position: setResponsive('center', position),
          repeat: 'no-repeat',
          size: 'contain'
        }}
        // to preserve the height of SVG image
        height={setResponsive('195px', '240px', '300px')}
        margin={{ bottom: 'small' }}
        width="100%"
      />
    </Row>
  )
}

export const AboutOverviewSection = () => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <Row>
        <Card
          heading="Saving Time to Save Lives"
          body="When childhood cancer researchers download transcriptome data 
      (the collection of RNA molecules in a cell), each set can seem like its 
      own language. Different studies use distinct technologies to collect the 
      same type of data, and each technology has its own language. Researchers 
      can spend up to 30% of their time translating these datasets into something 
      they can use. This cumbersome process takes away valuable resources that 
      could be spent in the lab discovering cutting-edge treatments and cures. 
      refine.bio is here to fix that."
          img={{
            url: 'illustration-saving-time.svg',
            position: 'center right'
          }}
        />
      </Row>
      <Row margin={{ top: setResponsive('xlarge', 'basex12') }}>
        <Card
          align="start"
          direction="row-reverse"
          heading="One Language, One Repository"
          body="It’s the Rosetta Stone for the vast amount of publicly available childhood 
      cancer data. It’s the first project of its kind to harmonize this information across 
      many different technologies into one universal repository. Now researchers can pull 
      from this massive dataset, saving precious time."
          img={{
            url: 'illustration-one-repo.svg',
            position: 'center left'
          }}
        />
      </Row>
      <Row margin={{ top: setResponsive('xlarge', 'basex12') }}>
        <Card
          heading="Better Medicine Through Machine Learning"
          body="With the power of machine learning and the rich collection of data in refine.bio, 
      researchers have the potential to extract more information about the biology of a patient’s 
      sample. In turn researchers will be able to better classify patients and identify what types 
      of treatments might be most effective on a case-by-case basis, further enhancing the 
      burgeoning field of precision medicine."
          img={{
            url: 'illustration-network-bottle.svg',
            position: 'center right'
          }}
        />
      </Row>
    </>
  )
}

export default AboutOverviewSection
