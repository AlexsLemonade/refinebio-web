import { Box, Paragraph } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { Template } from './Template'

export const Custom504 = () => {
  return (
    <Template
      heading="We’re a little overwhelmed at the moment."
      body={
        <Box width={{ max: '450px' }}>
          <Paragraph size="large">
            We apologize for the inconvenience. We are working hard to restore
            normal service.
          </Paragraph>
          <Paragraph size="large">
            Follow us on twitter{' '}
            <Anchor
              href={links.ccdl_twitter}
              label="@CancerDataLab"
              rel="nofol low noopener noreferrer"
            />{' '}
            for updates.
          </Paragraph>
        </Box>
      }
      img="/tubey-distressed.svg"
      marginBottom="basex7"
    />
  )
}

export default Custom504
