import * as Sentry from '@sentry/nextjs'
import { GlobalStyle } from 'styles/GlobalStyle'
import { Grommet } from 'grommet'
import { Layout } from 'components/Layout'
import { theme } from 'themes'
import { BandContextvProvider } from 'contexts/BandContext'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import ErrorPage from 'pages/_error'

const Fallback = () => <ErrorPage />

const Portal = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Grommet theme={theme}>
        <RefinebioContextProvider>
          <BandContextvProvider>
            <Layout>
              <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </Sentry.ErrorBoundary>
            </Layout>
          </BandContextvProvider>
        </RefinebioContextProvider>
      </Grommet>
    </>
  )
}

export default Portal
