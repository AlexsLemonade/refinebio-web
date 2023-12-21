import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

// TEMP for adding the GTM in development (will be removed for staging/production deploy)
const isDev = process.env.NEXT_PUBLIC_DEV
const gtmTagID = process.env.NEXT_PUBLIC_GTM_TAG_ID

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&family=Rubik:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {isDev && (
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmTagID}');`
            }}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
        {isDev && (
          <noscript
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id="${gtmTagID}" height="0" width="0" style="display:none;visibility:hidden"/>`
            }}
          />
        )}
      </body>
    </Html>
  )
}
