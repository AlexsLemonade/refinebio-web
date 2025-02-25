import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { ErrorTemplate } from 'components/ErrorTemplate'

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
    <ErrorTemplate
      heading=" Uh-oh something went wrong!"
      body={
        <Box
          align="center"
          direction={setResponsive('column', 'row')}
          gap="xsmall"
          width={setResponsive('100%', 'auto')}
        >
          <Paragraph size="20px">Try refreshing the page or</Paragraph>
          <Button label="Go Back" primary responsive onClick={goBack} />
        </Box>
      }
      img="/tubey-spilled-sample.svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default Error500
