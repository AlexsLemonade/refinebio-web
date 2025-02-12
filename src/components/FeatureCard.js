import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'

export const FeatureCard = ({ heading, body, svgIcon, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      basis={setResponsive('auto', 'full')}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Row>
        <Box margin={{ bottom: 'small', right: 'large' }} aria-hidden>
          {svgIcon}
        </Box>
        <Column>
          <Heading
            level={2}
            margin={{ bottom: 'small' }}
            size={setResponsive('small', 'large')}
          >
            {heading}
          </Heading>
          <Paragraph size={setResponsive('medium', 'large', 'large')}>
            {body}
          </Paragraph>
        </Column>
      </Row>
    </Column>
  )
}

export default FeatureCard
