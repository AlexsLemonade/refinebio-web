import { Heading } from 'grommet'
import { FixedContainer } from 'components/FixedContainer'
import { Hero as SharedHero } from 'components/Hero'

export const HeroHeader = () => {
  return (
    <Heading
      color="alex-navy"
      level={1}
      margin={{ bottom: 'basex7' }}
      size="large"
      textAlign="center"
    >
      refine.bio Compendia packages the data processed by refine.bio pipelines
      for flexible and broad use by computational biologists and data scientists
    </Heading>
  )
}
export const Hero = () => {
  return (
    <FixedContainer width="850px">
      <SharedHero header={<HeroHeader />} marginBottom="basex7" />
    </FixedContainer>
  )
}

export default Hero
