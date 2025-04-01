import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/Button'
import { ErrorCode } from 'components/ErrorCode'

export const Error404 = ({ ...props }) => {
  const { back, events } = useRouter()

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
      heading="The page you are looking for isn’t expressed."
      img="/tubey-reward-poster.svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Button
        label="Go Back"
        margin={{ top: 'large' }}
        primary
        responsive
        onClick={goBack}
      />
    </ErrorCode>
  )
}

export default Error404
