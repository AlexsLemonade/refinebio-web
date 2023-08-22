import { FixedContainer } from 'components/shared/FixedContainer'
import { Custom404 } from 'components/Error/Custom404'
import { Custom504 } from 'components/Error/Custom504'

export const ErrorPage = ({ statusCode }) => {
  return (
    <FixedContainer>
      {statusCode === 404 && <Custom404 />}
      {statusCode === 504 && <Custom504 />}
    </FixedContainer>
  )
}

ErrorPage.getInitialProps = async ({ err }) => {
  return {
    statusCode: err ? err.statusCode : 504
  }
}

export default ErrorPage
