import * as Sentry from '@sentry/nextjs'
import { Grommet } from 'grommet'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <Grommet plain>
      <Sentry.ErrorBoundary fallback={Fallback} showDialog>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Sentry.ErrorBoundary>
    </Grommet>
  )
}

export default Portal
