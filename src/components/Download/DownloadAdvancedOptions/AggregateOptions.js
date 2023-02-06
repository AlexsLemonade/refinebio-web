import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'

export const AggregateOptions = () => {
  const { setResponsive } = useResponsive()
  const aggirateOptions = ['Experiment', 'Species']
  const [optionAggregate, setOptionAggregate] = useState(aggirateOptions[0])

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
      <Box
        margin={{
          top: setResponsive('xsmall', 'none'),
          left: setResponsive('none', 'xsmall')
        }}
        width="140px"
      >
        <Select
          options={aggirateOptions}
          value={optionAggregate}
          onChange={({ option }) => setOptionAggregate(option)}
        />
      </Box>
    </>
  )
}

export default AggregateOptions
