import { CheckBox as GrommetCheckBox, Box } from 'grommet'
import { InlineMessage } from 'components/shared/InlineMessage'

export const CheckBox = ({ error = false, errorText = '', ...props }) => {
  return (
    <Box style={{ position: 'relative' }} width="100%">
      {error && (
        <Box animation={{ type: 'fadeIn', duration: 300 }}>
          <InlineMessage
            color="error"
            height="16px"
            justify="center"
            label={errorText}
            iconSize="small"
            style={{ position: 'absolute', top: '-14px' }}
          />
        </Box>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetCheckBox error={error} {...props} />
    </Box>
  )
}

export default CheckBox
