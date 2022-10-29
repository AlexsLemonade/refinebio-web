import * as Sentry from '@sentry/nextjs'
import { GlobalStyle } from 'styles/GlobalStyle'
import { Grommet } from 'grommet'
import { Layout } from 'components/shared/Layout'
import { theme } from 'themes'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <RefinebioContextProvider>
          <Layout>
            <Sentry.ErrorBoundary fallback={Fallback} showDialog>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </Sentry.ErrorBoundary>
          </Layout>
        </RefinebioContextProvider>
      </Grommet>
    </>
  )
}

export default Portal
