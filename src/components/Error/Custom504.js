import { Box, Paragraph } from 'grommet'
import { TwoColumns } from './TwoColumns'

export const Custom504 = () => {
  return (
    <TwoColumns
      heading="We’re a little overwhelmed at the moment."
      body={
        <Box width={{ max: '450px' }}>
          <Paragraph size="large">
            We apologize for the inconvenience. We are working hard to restore
            normal service.
          </Paragraph>
        </Box>
      }
      img="/distressed-tubey.svg"
    />
  )
}

export default Custom504
