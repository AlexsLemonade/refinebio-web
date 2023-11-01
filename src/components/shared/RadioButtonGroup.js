import { RadioButtonGroup as GrommetRadioButtonGroup, Box } from 'grommet'
import { InlineMessage } from 'components/shared/InlineMessage'

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
            color="error"
            height="16px"
            justify="center"
            label={errorText}
            labelOnly={labelOnly}
            iconSize="small"
            style={{ position: 'absolute', top: positionTop }}
          />
        </Box>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetRadioButtonGroup error={error} {...props} />
    </Box>
  )
}

export default RadioButtonGroup
