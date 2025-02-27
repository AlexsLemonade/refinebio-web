import { Error } from 'components/Error'
import { FixedContainer } from 'components/FixedContainer'

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
