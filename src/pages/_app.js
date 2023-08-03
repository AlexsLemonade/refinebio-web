import * as Sentry from '@sentry/nextjs'
import 'regenerator-runtime'
import { Grommet } from 'grommet'
import { GlobalStyle } from 'styles/GlobalStyle'
import { theme } from 'themes'
import { BandContextProvider } from 'contexts/BandContext'
import { DatasetContextProvider } from 'contexts/DatasetContext'
import { ModalContextProvider } from 'contexts/ModalContext'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import { SearchManagerContextProvider } from 'contexts/SearchManagerContext'
import { ErrorPage } from 'pages/_error'
import getPageLoader from 'helpers/getPageLoader'
import { Layout } from 'components/Layout'
import { PageTitle } from 'components/shared/PageTitle'

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
                <PageTitle />
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
