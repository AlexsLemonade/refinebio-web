import { Box, Heading, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero as SharedHero } from 'components/shared/Hero'

const HeroHeader = () => {
  const { viewport, setResponsive } = useResponsive()

  return (
    <Heading
      color="white"
      level={1}
      margin={{ bottom: 'large' }}
      size={setResponsive('large', 'xlarge')}
      style={{ textShadow: '0 3px 19px rgba(0,0,0,.5)' }}
      textAlign="center"
      weight="500"
    >
      Fighting childhood cancer, {viewport !== 'small' && <br />}thousands of
      datasets at a time
    </Heading>
  )
}
const Block = ({ count, text }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center" margin={{ top: setResponsive('medium', 'none') }}>
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
        margin={{ bottom: setResponsive('none', 'xlarge') }}
        size={setResponsive('small', 'large')}
        textAlign="center"
      >
        refine.bio has harmonized over {formatNumbers(data.gene_count)} gene
        expression experiments
      </Heading>

      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        width="100%"
      >
        <Block
          count={`${data.sample_count}M`}
          text="million samples available"
        />
        <Block
          count={`${data.organism_count}K`}
          text="Support for 3000 organisms"
        />
        <Block
          count={`${data.raw_data_count} TB`}
          text="terabytes of raw data processed"
        />
      </Box>
    </>
  )
}

export const Hero = () => {
  const { setResponsive } = useResponsive()
  return (
    <FixedContainer>
      <SharedHero
        header={<HeroHeader />}
        boxPadding={{
          horizontal: setResponsive('small', 'xlarge'),
          vertical: setResponsive('small', 'large')
        }}
        marginBottom="xlarge"
      >
        <HeroBody />
      </SharedHero>
    </FixedContainer>
  )
}

export default Hero