import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { TextInput } from 'components/shared/TextInput'

export const SignUpBlock = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      background="gradient_blue_dark"
      pad={{ vertical: setResponsive('medium', 'basex7', 'basex18') }}
    >
      <FixedContainer align="center">
        <Heading level={1} color="white" margin={{ bottom: 'medium' }}>
          Sign Up for Updates
        </Heading>
        <Paragraph
          color="white"
          margin={{ bottom: 'small' }}
          textAlign="center"
          size="large"
        >
          Be the first one to know about new features, compendia releases and
          more!
        </Paragraph>
        {/* fixed width to preserve UI layout in wider screens */}
        <Row width="500px">
          <Column fill>
            <TextInput placeholder="jdoe@example.com" />
          </Column>
          <Button
            label="Sign up"
            margin={{
              left: setResponsive('none', 'small'),
              top: setResponsive('small', 'none')
            }}
            primary
            light
            responsive
          />
        </Row>
      </FixedContainer>
    </Box>
  )
}

export default SignUpBlock
