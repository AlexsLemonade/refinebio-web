import * as Sentry from '@sentry/nextjs'
import 'regenerator-runtime'
import { GlobalStyle } from 'styles/GlobalStyle'
import { Grommet } from 'grommet'
import { Layout } from 'components/Layout'
import { theme } from 'themes'
import { BandContextvProvider } from 'contexts/BandContext'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import ErrorPage from 'pages/_error'
import { ModalContextProvider } from 'contexts/ModalContext'
import { DatasetContextProvider } from 'contexts/DatasetContext'

const Fallback = () => <ErrorPage />

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <RefinebioContextProvider>
          <DatasetContextProvider>
            <BandContextvProvider>
              <Layout>
                <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                  <ModalContextProvider>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Component {...pageProps} />
                  </ModalContextProvider>
                </Sentry.ErrorBoundary>
              </Layout>
            </BandContextvProvider>
          </DatasetContextProvider>
        </RefinebioContextProvider>
      </Grommet>
    </>
  )
}

export default App
