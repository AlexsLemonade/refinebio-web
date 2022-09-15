import * as Sentry from '@sentry/nextjs'
import { PortalContextProvider } from 'contexts/PortalContext'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <PortalContextProvider>
      <Sentry.ErrorBoundary fallback={Fallback} showDialog>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Sentry.ErrorBoundary>
    </PortalContextProvider>
  )
}

export default Portal
