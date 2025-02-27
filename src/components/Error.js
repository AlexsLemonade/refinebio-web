/* eslint-disable react/jsx-props-no-spreading */
import { Error404 } from 'components/Error404'
import { Error500 } from 'components/Error500'
import { Error504 } from 'components/Error504'

export const Error = ({ statusCode, ...props }) => {
  const errorCodeComponents = {
    404: Error404,
    500: Error500,
    504: Error504
  }

  const Component =
    errorCodeComponents[
      Object.keys(errorCodeComponents).find(
        (state) => Number(state) === statusCode
      )
    ]

  if (!Component) return <Error500 {...props} />

  return <Component {...props} />
}

export default Error
