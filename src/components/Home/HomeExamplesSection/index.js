import { Box, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { HeadMapIcon } from '../../../images/graphic-heatmap.svg'
import { PathwayIcon } from '../../../images/graphic-pathway.svg'
import { WaySignsIcon } from '../../../images/graphic-way-signs.svg'
import { Card } from './Card'

export const HomeExamplesSection = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      background="gradientBlueDark"
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
            footer={
              <Button
                href={links.refinebio_github_example}
                label="Get Started"
                secondary
                responsive
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            svgIcon={<WaySignsIcon />}
            margin={{ bottom: setResponsive('large', 'none') }}
          />
          <Card
            heading="Differential Expression Analysis"
            body="Learn how you can do differential expression analysis with refine.bio datasets."
            footer={
              <>
                <Button
                  href={links.refinebio_github_differential_expression_rnaseq}
                  label="RNA-seq Example"
                  secondary
                  responsive
                  rel="noopener noreferrer"
                  target="_blank"
                />
                <Button
                  href={
                    links.refinebio_github_differential_expression_microarray
                  }
                  label="Microarray Example"
                  margin={{ top: setResponsive('small', 'medium') }}
                  secondary
                  responsive
                  rel="noopener noreferrer"
                  target="_blank"
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
                <Button
                  href={links.refinebio_github_pathway_analysis_rnaseq}
                  label="RNA-seq Example"
                  secondary
                  responsive
                  rel="noopener noreferrer"
                  target="_blank"
                />
                <Button
                  href={links.refinebio_github_pathway_analysis_microarray}
                  label="Microarray Example"
                  margin={{ top: setResponsive('small', 'medium') }}
                  secondary
                  responsive
                  rel="noopener noreferrer"
                  target="_blank"
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
