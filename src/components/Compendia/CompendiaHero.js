import { useResponsive } from 'hooks/useResponsive'
import { Heading } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'

export const HeroHeader = () => {
  const { setResponsive } = useResponsive()

  return (
    <Heading
      color="alex-navy"
      level={1}
      margin={{ bottom: 'basex7' }}
      size={setResponsive('h1_small', 'h1_large')}
      textAlign="center"
    >
      refine.bio Compendia packages the data processed by refine.bio pipelines
      for flexible and broad use by computational biologists and data scientists
    </Heading>
  )
}
export const CompendiaHero = () => {
  return (
    <FixedContainer width="850px">
      <Hero header={<HeroHeader />} marginBottom="basex7" />
    </FixedContainer>
  )
}

export default CompendiaHero
