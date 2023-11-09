import { FixedContainer } from 'components/shared/FixedContainer'
import { Error } from 'components/shared/Error'

export const ErrorPage = ({ statusCode }) => (
  <FixedContainer>
    <Error statusCode={statusCode} />
  </FixedContainer>
)

ErrorPage.getInitialProps = async ({ err }) => {
  return {
    statusCode: err ? err.statusCode : 404
  }
}

export default ErrorPage
