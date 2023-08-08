import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero as SharedHero } from 'components/shared/Hero'
import { HeroBody } from './HeroBody'

export const Hero = () => {
  const { setResponsive } = useResponsive()
  return (
    <FixedContainer>
      <SharedHero
        boxPadding={{
          horizontal: setResponsive('large', 'basex12'),
          vertical: setResponsive('large', 'basex8')
        }}
        // fixed width to preserve UI layout in wider screens
        boxWidth="815px"
      >
        <HeroBody />
      </SharedHero>
    </FixedContainer>
  )
}

export default Hero
