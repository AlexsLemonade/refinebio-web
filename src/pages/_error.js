import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ErrorPage = () => {
  const router = useRouter()

  useEffect(() => {
    const forceRefresh = (url) => {
      window.location = url
    }

    router.events.on('routeChangeStart', forceRefresh)
  })

  const goBack = () => {
    router.back()
  }

  return (
    <div>
      <h1>We encountered an unexpected error.</h1>
      <p>Please try again later..</p>
      <button type="button" onClick={goBack}>
        Go Back
      </button>
    </div>
  )
}

export default ErrorPage
