import { Heading } from 'grommet'
import Refinebio from '@ccdl/refinebio/src'

const Home = () => {
  const api = Refinebio()
  console.log(api.Dataset())

  return (
    <Heading level="1" size="large">
      Home
    </Heading>
  )
}

export default Home
