/* eslint-disable react/jsx-props-no-spreading */
import { Custom404 } from './Custom404'
import { Custom500 } from './Custom500'
import { Custom504 } from './Custom504'

export const Error = ({ statusCode, ...props }) => (
  <>
    {statusCode === 404 && <Custom404 {...props} />}
    {statusCode === 500 && <Custom500 {...props} />}
    {statusCode === 504 && <Custom504 {...props} />}
  </>
)

export default Error
