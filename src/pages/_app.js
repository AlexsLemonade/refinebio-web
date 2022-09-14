import * as Sentry from '@sentry/nextjs'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <Sentry.ErrorBoundary fallback={Fallback} showDialog>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  )
}

export default Portal
