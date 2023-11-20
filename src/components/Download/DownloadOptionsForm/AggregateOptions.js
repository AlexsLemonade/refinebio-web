import { Box, Select, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links, options } from 'config'

export const AggregateOptions = ({
  value,
  handleChange,
  name = 'aggregate_by',
  column = false
}) => {
  const { setResponsive } = useResponsive()

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
          options={Object.values(options.aggregation)}
          value={value}
          valueKey={{ key: 'value', reduce: true }}
          margin={{ horizontal: 'xxsmall' }}
          onChange={(e) => handleChange(name, e.value)}
        />
      </Box>
    </>
  )
}

export default AggregateOptions
