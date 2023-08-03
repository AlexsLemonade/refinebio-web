import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links, options } from 'config'

export const AggregateOptions = () => {
  const { setResponsive } = useResponsive()
  const [aggregateOption, setAggregateOption] = useState(
    options.aggregation[0].value
  )

  return (
    <>
      <Box
        margin={{ top: setResponsive('small', 'none') }}
        style={{ position: 'relative' }}
      >
        <Text>
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
          options={Object.values(options.aggregation)}
          labelKey="label"
          value={aggregateOption}
          valueKey={{ key: 'value', reduce: true }}
          margin={{ horizontal: 'xxsmall' }}
          onChange={({ value: nextValue }) => setAggregateOption(nextValue)}
        />
      </Box>
    </>
  )
}

export default AggregateOptions
