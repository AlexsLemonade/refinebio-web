import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'

const Card = ({ heading, body, footer, img, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      background={{
        image: `url('${img}')`,
        position: 'bottom right',
        repeat: 'no-repeat',
        size: '100%'
      }}
      elevation="medium"
      pad={{
        horizontal: setResponsive('large', 'xxlarge', 'xxxlarge'),
        top: setResponsive('large', 'xlarge'),
        bottom: setResponsive('large', 'xlarge', 'basex8')
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Heading level={1} margin={{ bottom: setResponsive('medium', 'small') }}>
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box margin={{ top: setResponsive('large', 'medium') }}>{footer}</Box>
    </Column>
  )
}

export const HomeDocumentsSection = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box pad={{ vertical: setResponsive('xlarge', 'xxlarge', 'basex10') }}>
      <FixedContainer
        pad={{ horizontal: setResponsive('large', 'medium', 'basex9') }}
      >
        <Row>
          <Card
            heading="refine.bio Compendia"
            body="refine.bio compendia are collections of samples that have been
      processed and packaged for broad and felxible use."
            footer={<Button label="Learn More" secondary responsive />}
            img="network.svg"
            margin={{ bottom: setResponsive('large', '0') }}
          />
          <Card
            heading="Explore the docs"
            body="Learn about how we source and process data and other downstream 
    analyses you can do with refine.bio data."
            footer={<Button label="Take me to the docs" secondary responsive />}
            img="undraw_files.svg"
            margin={{ left: setResponsive('0', 'large', 'xxxlarge') }}
          />
        </Row>
      </FixedContainer>
    </Box>
  )
}

export default HomeDocumentsSection
