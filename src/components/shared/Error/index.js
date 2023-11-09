import { Custom404 } from './Custom404'
import { Custom500 } from './Custom500'
import { Custom504 } from './Custom504'

export const Error = ({ statusCode }) => (
  <>
    {statusCode === 404 && <Custom404 />}
    {statusCode === 500 && <Custom500 />}
    {statusCode === 504 && <Custom504 />}
  </>
)

export default Error
