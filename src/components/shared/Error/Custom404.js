import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/shared/Button'
import { TwoColumns } from './TwoColumns'

export const Custom404 = () => {
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
    <TwoColumns
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
    />
  )
}

export default Custom404
