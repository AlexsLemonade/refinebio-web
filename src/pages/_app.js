/* eslint-disable react/jsx-props-no-spreading */
import * as Sentry from '@sentry/nextjs'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <Sentry.ErrorBoundary fallback={Fallback} showDialog>
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  )
}

export default Portal
