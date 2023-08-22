import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { TwoColumns } from './TwoColumns'

export const Custom500 = () => {
  const { back, events } = useRouter()
  const { setResponsive } = useResponsive()

  useEffect(() => {
    const forceRefresh = (url) => {
      window.location = url
    }
    events.on('routeChangeStart', forceRefresh)
  })

  const goBack = () => {
    back()
  }

  return (
    <TwoColumns
      heading=" Uh-oh something went wrong!"
      body={
        <Box
          align="center"
          direction={setResponsive('column', 'row')}
          gap="xsmall"
        >
          <Paragraph size="large">Try refreshing the page or</Paragraph>
          <Button label="Go Back" primary responsive onClick={goBack} />
        </Box>
      }
      img="/spilled-sample.svg"
    />
  )
}

export default Custom500
