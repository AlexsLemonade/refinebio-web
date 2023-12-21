import Script from 'next/script'
import * as Sentry from '@sentry/nextjs'
import 'regenerator-runtime'
import { Grommet } from 'grommet'
import { GlobalStyle } from 'styles/GlobalStyle'
import { theme } from 'themes'
import { BandContextProvider } from 'contexts/BandContext'
import { DatasetManagerContextProvider } from 'contexts/DatasetManagerContext'
import { ModalContextProvider } from 'contexts/ModalContext'
import { RefinebioContextProvider } from 'contexts/RefinebioContext'
import { SearchManagerContextProvider } from 'contexts/SearchManagerContext'
import { ErrorPage } from 'pages/_error'
import getPageLoader from 'helpers/getPageLoader'
import { Layout } from 'components/Layout'
import { PageTitle } from 'components/shared/PageTitle'

getPageLoader()
const Fallback = () => <ErrorPage />
// sets the correct environment's measurement ID
const isDev = process.env.NEXT_PUBLIC_DEV
// TEMP local.env is used for the GA4 "Development" data stream
const GA4MeasurementID = isDev
  ? process.env.NEXT_PUBLIC_DEV_GA4_MEASUREMENT_ID
  : process.env.GA4_MEASUREMENT_ID

const App = ({ Component, pageProps }) => {
  return (
    <RefinebioContextProvider>
      <GlobalStyle />
      <Grommet theme={theme}>
        <SearchManagerContextProvider>
          <DatasetManagerContextProvider>
            <BandContextProvider>
              <PageTitle />
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA4MeasurementID}`}
              />

              <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA4MeasurementID}');
                  `
                }}
              />
              <Layout>
                <Sentry.ErrorBoundary fallback={Fallback} showDialog>
                  <ModalContextProvider>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Component {...pageProps} />
                  </ModalContextProvider>
                </Sentry.ErrorBoundary>
              </Layout>
            </BandContextProvider>
          </DatasetManagerContextProvider>
        </SearchManagerContextProvider>
      </Grommet>
    </RefinebioContextProvider>
  )
}

export default App
