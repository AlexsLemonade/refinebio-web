import * as Sentry from '@sentry/nextjs'
import { Grommet } from 'grommet'
import theme from 'themes'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <Grommet theme={theme}>
      <Sentry.ErrorBoundary fallback={Fallback} showDialog>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Sentry.ErrorBoundary>
    </Grommet>
  )
}

export default Portal
