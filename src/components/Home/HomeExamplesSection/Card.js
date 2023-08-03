import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/shared/Column'

export const Card = ({ heading, body, footer, svgIcon, ...props }) => {
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
      <Heading level={4} margin={{ bottom: 'small' }} size="small" weight="500">
        {heading}
      </Heading>
      <Paragraph>{body}</Paragraph>
      <Box align="center" margin={{ top: setResponsive('large', 'medium') }}>
        {footer}
      </Box>
    </Column>
  )
}

export default Card
