import { Box, Heading, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import abbreviateNumbers from 'helpers/abbreviateNumbers'
import formatBytes from 'helpers/formatBytes'
import formatNumbers from 'helpers/formatNumbers'
import { cache } from 'config'
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
        {text}
      </Text>
    </Box>
  )
}

const HeroBody = () => {
  const { setResponsive } = useResponsive()
  const apiCache = {
    availableSamples: abbreviateNumbers(cache.statsAbout.samples_available),
    processedExperiment: formatNumbers(cache.statsAbout.experiments_processed),
    supportedOrganism: abbreviateNumbers(cache.statsAbout.supported_organisms),
    totalSize: formatBytes(cache.statsAbout.total_size_in_bytes, 1)
  }

  return (
    <>
      <Heading
        level={2}
        margin={{ bottom: setResponsive('none', 'xlarge') }}
        size={setResponsive('small', 'large')}
        textAlign="center"
      >
        refine.bio has harmonized over {apiCache.processedExperiment} gene
        expression experiments
      </Heading>

      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        width="100%"
      >
        <Block
          count={apiCache.availableSamples}
          text={`${apiCache.availableSamples} samples available`}
        />
        <Block
          count={apiCache.supportedOrganism}
          text={`Support for ${apiCache.supportedOrganism} organisms`}
        />
        <Block
          count={apiCache.totalSize}
          text={`${apiCache.totalSize} of raw data processed`}
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
