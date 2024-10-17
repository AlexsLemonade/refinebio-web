import getReadable from 'helpers/getReadable'
import uniqueArray from './uniqueArray'
// Return an array of options for the given option values for Grommet's built-in <Select /> and <RadioButtonGroup />
// resource: https://v2.grommet.io/radiobuttongroup#options
// (*this helper is used when the disaply labels and values differ)
// e.g., getReadableOptions(['EXPERIMENT', 'SPECIES']) returns
// [ { label: 'Experiment', value: 'EXPERIMENT'}, { label: 'Species', value: 'SPECIES'}]
export default (options = []) =>
  uniqueArray(options).map((option) => ({
    label: getReadable(option),
    value: option
  }))
