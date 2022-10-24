import * as Sentry from '@sentry/nextjs'
import { Reset } from 'styles/Reset'
import { Grommet } from 'grommet'
import { theme } from 'themes'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <>
      <Reset />
      <Grommet theme={theme}>
        <RefinebioContextProvider>
          <Sentry.ErrorBoundary fallback={Fallback} showDialog>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Sentry.ErrorBoundary>
        </RefinebioContextProvider>
      </Grommet>
    </>
  )
}

export default Portal
