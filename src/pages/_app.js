import * as Sentry from '@sentry/nextjs'
import 'regenerator-runtime'
import { GlobalStyle } from 'styles/GlobalStyle'
import { Grommet } from 'grommet'
import { Layout } from 'components/Layout'
import { theme } from 'themes'
import { BandContextProvider } from 'contexts/BandContext'
import { DatasetContextProvider } from 'contexts/DatasetContext'
import { SearchManagerContextProvider } from 'contexts/SearchManagerContext'
import { ModalContextProvider } from 'contexts/ModalContext'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import { ErrorPage } from 'pages/_error'
import getPageLoader from 'helpers/getPageLoader'

getPageLoader()
const Fallback = () => <ErrorPage />

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <RefinebioContextProvider>
          <SearchManagerContextProvider>
            <DatasetContextProvider>
              <BandContextProvider>
                <Layout>
                  <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                    <ModalContextProvider>
                      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                      <Component {...pageProps} />
                    </ModalContextProvider>
                  </Sentry.ErrorBoundary>
                </Layout>
              </BandContextProvider>
            </DatasetContextProvider>
          </SearchManagerContextProvider>
        </RefinebioContextProvider>
      </Grommet>
    </>
  )
}

export default App
