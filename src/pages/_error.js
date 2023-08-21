import { FixedContainer } from 'components/shared/FixedContainer'
import { Custom404 } from 'components/Error/Custom404'
import { Custom500 } from 'components/Error/Custom500'
import { HeavyTraffic } from 'components/Error/HeavyTraffic'

export const ErrorPage = ({ statusCode }) => {
  return (
    <FixedContainer>
      {statusCode === 404 && <Custom404 />}
      {statusCode === 500 && <Custom500 />}
      {statusCode === 504 && <HeavyTraffic />}
    </FixedContainer>
  )
}

ErrorPage.getInitialProps = async ({ err }) => {
  return {
    statusCode: err ? err.statusCode : 500
  }
}

export default ErrorPage
