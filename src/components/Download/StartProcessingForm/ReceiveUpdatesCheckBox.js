import { CheckBox } from 'components/shared/CheckBox'

export const ReceiveUpdatesCheckBox = ({ value, handleChange }) => {
  return (
    <CheckBox
      checked={value}
      label="I would like to receive occasional updates from the refine.bio team"
      name="email_ccdl_ok"
      onChange={handleChange}
    />
  )
}

export default ReceiveUpdatesCheckBox
