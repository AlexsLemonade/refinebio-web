import { FixedContainer } from 'components/shared/FixedContainer'
import { Custom404 } from 'components/Error/Custom404'

export const ErrorPage = ({ statusCode }) => {
  return <FixedContainer>{statusCode === 404 && <Custom404 />}</FixedContainer>
}

ErrorPage.getInitialProps = async ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return {
    statusCode
  }
}

export default ErrorPage
