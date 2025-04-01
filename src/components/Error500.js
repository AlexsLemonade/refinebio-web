import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { ErrorCode } from 'components/ErrorCode'

export const Error500 = ({ ...props }) => {
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
    <ErrorCode
      heading=" Uh-oh something went wrong!"
      img="/tubey-spilled-sample.svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Box
        align="center"
        direction={setResponsive('column', 'row')}
        gap="xsmall"
        width={setResponsive('100%', 'auto')}
      >
        <Paragraph size="20px">Try refreshing the page or</Paragraph>
        <Button label="Go Back" primary responsive onClick={goBack} />
      </Box>
    </ErrorCode>
  )
}

export default Error500
