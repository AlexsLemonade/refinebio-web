/* eslint-disable react/jsx-props-no-spreading */
import { Error404 } from 'components/Error404'
import { Error500 } from 'components/Error500'
import { Error504 } from 'components/Error504'

export const Error = ({ statusCode, ...props }) => (
  <>
    {statusCode === 404 && <Error404 {...props} />}
    {statusCode === 500 && <Error500 {...props} />}
    {statusCode === 504 && <Error504 {...props} />}
  </>
)

export default Error
