import { FixedContainer } from 'components/shared/FixedContainer'
import { HeavyTraffic } from 'components/Error/HeavyTraffic'

export const Demo504 = ({ statusCode }) => {
  return (
    <FixedContainer>{statusCode === 504 && <HeavyTraffic />}</FixedContainer>
  )
}

Demo504.getInitialProps = async () => {
  return {
    statusCode: 504
  }
}

export default Demo504
