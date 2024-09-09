import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { DocumentCard } from './DocumentCard'

export const Documents = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box pad={{ vertical: setResponsive('xlarge', 'basex6', 'basex10') }}>
      <FixedContainer
        pad={{ horizontal: setResponsive('large', 'medium', 'basex9') }}
      >
        <Row>
          <DocumentCard
            heading="refine.bio Compendia"
            body="refine.bio compendia are collections of samples that have been
      processed and packaged for broad and felxible use."
            footer={
              <Button
                href="/compendia/normalized"
                label="Learn More"
                secondary
                responsive
              />
            }
            img="network.svg"
            margin={{ bottom: setResponsive('large', 'none') }}
          />
          <DocumentCard
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

export default Documents
