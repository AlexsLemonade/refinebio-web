import { Box, Paragraph } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { Template } from './Template'

export const Custom504 = ({ ...props }) => {
  // makes text align center for a single column
  // and sets max width to auto
  const isColumn = props.direction === 'column'
  const textAlign = isColumn ? 'center' : 'start'

  return (
    <Template
      heading="We’re a little overwhelmed at the moment."
      body={
        <Box width={{ max: isColumn ? 'auto' : '540px' }}>
          <Paragraph size="20px" textAlign={textAlign}>
            We apologize for the inconvenience. We are working hard to restore
            normal service.
          </Paragraph>
          <Paragraph size="20px" textAlign={textAlign}>
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default Custom504
