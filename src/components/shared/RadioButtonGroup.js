import { RadioButtonGroup as GrommetRadioButtonGroup, Box } from 'grommet'
import styled from 'styled-components'
import { InlineMessage } from 'components/shared/InlineMessage'

const CustomRadioButton = styled(GrommetRadioButtonGroup)`
  flex-wrap: wrap;
  label > span {
    width: max-content;
  }
`

export const RadioButtonGroup = ({
  error = false,
  errorText = '',
  labelOnly = false,
  positionTop = '-18px',
  ...props
}) => {
  return (
    <Box style={{ position: 'relative' }} width="100%">
      {error && (
        <Box animation={{ type: 'fadeIn', duration: 300 }}>
          <InlineMessage
            type="error"
            label={errorText}
            labelOnly={labelOnly}
            height="16px"
            justify="center"
            iconSize="small"
            style={{ position: 'absolute', top: positionTop }}
          />
        </Box>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CustomRadioButton error={error} {...props} />
    </Box>
  )
}

export default RadioButtonGroup
