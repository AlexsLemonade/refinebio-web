import * as Sentry from '@sentry/nextjs'
import 'regenerator-runtime'
import { GlobalStyle } from 'styles/GlobalStyle'
import { Grommet } from 'grommet'
import { Layout } from 'components/Layout'
import { theme } from 'themes'
import { BandContextProvider } from 'contexts/BandContext'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <RefinebioContextProvider>
          <BandContextProvider>
            <Layout>
              <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </Sentry.ErrorBoundary>
            </Layout>
          </BandContextProvider>
        </RefinebioContextProvider>
      </Grommet>
    </>
  )
}

export default App
