import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { Card } from './Card'

export const HomeDocumentationSection = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box pad={{ vertical: setResponsive('xlarge', 'basex6', 'basex10') }}>
      <FixedContainer
        pad={{ horizontal: setResponsive('large', 'medium', 'basex9') }}
      >
        <Row>
          <Card
            heading="refine.bio Compendia"
            body="refine.bio compendia are collections of samples that have been
      processed and packaged for broad and felxible use."
            footer={
              <Button
                href="/compendia/normalized"
                label="Learn More"
                secondary
                responsive
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            img="network.svg"
            margin={{ bottom: setResponsive('large', 'none') }}
          />
          <Card
            heading="Explore the docs"
            body="Learn about how we source and process data and other downstream 
    analyses you can do with refine.bio data."
            footer={
              <Button
                href={links.refinebio_docs}
                label="Take me to the docs"
                secondary
                responsive
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            img="undraw_files.svg"
            margin={{ left: setResponsive('none', 'large', 'basex7') }}
          />
        </Row>
      </FixedContainer>
    </Box>
  )
}

export default HomeDocumentationSection