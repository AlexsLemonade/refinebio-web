import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { HeroBody } from './HeroBody'

export const HomeHero = () => {
  const { setResponsive } = useResponsive()
  return (
    <FixedContainer>
      <Hero
        boxPadding={{
          horizontal: setResponsive('large', 'basex12'),
          vertical: setResponsive('large', 'basex8')
        }}
        // fixed width to preserve UI layout in wider screens
        boxWidth="815px"
      >
        <HeroBody />
      </Hero>
    </FixedContainer>
  )
}

export default HomeHero
