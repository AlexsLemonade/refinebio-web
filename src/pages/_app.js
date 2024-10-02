import * as Sentry from '@sentry/nextjs'
import 'regenerator-runtime'
import { Grommet } from 'grommet'
import { GlobalStyle } from 'styles/GlobalStyle'
import { theme } from 'themes'
import { BandContextProvider } from 'contexts/BandContext'
import { DatasetManagerContextProvider } from 'contexts/DatasetManagerContext'
import { LayoutRefsProvider } from 'contexts/LayoutRefsContext'
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
    <RefinebioContextProvider>
      <GlobalStyle />
      <Grommet theme={theme}>
        <SearchManagerContextProvider>
          <DatasetManagerContextProvider>
            <BandContextProvider>
              <PageTitle />
              <LayoutRefsProvider>
                <Layout>
                  <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                    <ModalContextProvider>
                      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                      <Component {...pageProps} />
                    </ModalContextProvider>
                  </Sentry.ErrorBoundary>
                </Layout>
              </LayoutRefsProvider>
            </BandContextProvider>
          </DatasetManagerContextProvider>
        </SearchManagerContextProvider>
      </Grommet>
    </RefinebioContextProvider>
  )
}

export default App
