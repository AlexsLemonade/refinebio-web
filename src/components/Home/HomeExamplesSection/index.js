import { useResponsive } from 'hooks/useResponsive'
import { Box, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { HeadMapIcon } from '../../../images/graphic-heatmap.svg'
import { PathwayIcon } from '../../../images/graphic-pathway.svg'
import { WaySignsIcon } from '../../../images/graphic-way-signs.svg'
import { Card } from './Card'

export const HomeExamplesSection = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      background="gradient_blue_dark"
      pad={{ vertical: setResponsive('medium', 'basex6', 'basex10') }}
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
          <Card
            heading="Get Started using refine.bio data"
            body="Explore the different ways you can use refine.bio data to help
      with your scientific questions."
            footer={<Button label="Get Started" secondary responsive />}
            svgIcon={<WaySignsIcon />}
            margin={{ bottom: setResponsive('large', 'none') }}
          />
          <Card
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
              left: setResponsive('none', 'medium', 'xlarge'),
              bottom: setResponsive('large', 'none')
            }}
          />
          <Card
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
              left: setResponsive('none', 'medium', 'xlarge')
            }}
          />
        </Row>
      </FixedContainer>
    </Box>
  )
}

export default HomeExamplesSection
