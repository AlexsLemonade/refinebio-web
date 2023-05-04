import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Form, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { TextInput } from 'components/shared/TextInput'
import { links } from 'config'

export const DownloadEmailForm = () => {
  const { setResponsive } = useResponsive()
  const [subscribe, setSubscribe] = useState(true)

  return (
    <Form>
      <Row width="500px">
        <Column fill basis="1">
          <TextInput placeholder="jdoe@example.com" type="email" />
        </Column>
        <Button
          label="Submit"
          margin={{
            left: setResponsive('none', 'small'),
            top: setResponsive('small', 'none')
          }}
          primary
          responsive
          type="submit"
        />
      </Row>
      <Box margin={{ top: 'small' }}>
        <CheckBox
          label={
            <Text>
              I agree to the{' '}
              <Anchor
                href={links.terms}
                label="Terms of Use"
                rel="noopener noreferrer"
              />
            </Text>
          }
        />
        <CheckBox
          checked={subscribe}
          label="I would like to receive occasional updates from the refine.bio team"
          onClick={() => setSubscribe(!subscribe)}
        />
      </Box>
    </Form>
  )
}
