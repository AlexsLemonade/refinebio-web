import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { HeadMapIcon } from '../../images/graphic-heatmap.svg'
import { PathwayIcon } from '../../images/graphic-pathway.svg'
import { WaySignsIcon } from '../../images/graphic-way-signs.svg'

const Card = ({ heading, body, footer, svgIcon, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      background="white"
      pad={setResponsive('large', 'medium')}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Box height="xxxlarge" margin={{ bottom: 'medium' }} aria-hidden>
        {svgIcon}
      </Box>
      <Heading
        level={4}
        margin={{ bottom: 'small' }}
        responsive={false}
        weight="500"
      >
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box align="center" margin={{ top: setResponsive('large', 'medium') }}>
        {footer}
      </Box>
    </Column>
  )
}

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
