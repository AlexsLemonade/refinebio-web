import { Box, Select, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import getReadableOptions from 'helpers/getReadableOptions'
import { Anchor } from 'components/Anchor'
import { Icon } from 'components/Icon'
import { links } from 'config'

export const AggregateOptions = ({
  value,
  handleChange,
  handleUpdateDownloadOptions = () => {},
  name = 'aggregate_by',
  column = false
}) => {
  const { setResponsive } = useResponsive()
  const aggreteByValues = ['EXPERIMENT', 'SPECIES']

  return (
    <>
      <Box
        margin={{ top: setResponsive('small', 'none') }}
        style={{ position: 'relative' }}
      >
        <Text margin={{ bottom: column ? 'small' : 'none' }}>
          Aggregate{' '}
          <Anchor
            href={links.refinebio_docs_aggregation}
            title="What does aggregate mean?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="Help" size="small" />
          </Anchor>
        </Text>
      </Box>
      <Box margin={{ top: setResponsive('xsmall', 'none') }} width="150px">
        <Select
          labelKey="label"
          name={name}
          options={getReadableOptions(aggreteByValues)}
          value={value}
          valueKey={{ key: 'value', reduce: true }}
          margin={{ horizontal: 'xxsmall' }}
          onChange={(e) => {
            handleUpdateDownloadOptions(name, e.value)
            return handleChange({ target: { name, value: e.value } })
          }}
        />
      </Box>
    </>
  )
}

export default AggregateOptions
