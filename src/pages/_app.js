import * as Sentry from '@sentry/nextjs'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <RefinebioContextProvider>
      <Sentry.ErrorBoundary fallback={Fallback} showDialog>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Sentry.ErrorBoundary>
    </RefinebioContextProvider>
  )
}

export default Portal
