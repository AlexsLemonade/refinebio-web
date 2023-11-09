import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/shared/Button'
import { Template } from './Template'

export const Custom404 = ({ ...props }) => {
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
    <Template
      heading="The page you are looking for isn’t expressed."
      body={
        <Button
          label="Go Back"
          margin={{ top: 'large' }}
          primary
          responsive
          onClick={goBack}
        />
      }
      img="/tubey-reward-poster.svg"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default Custom404
