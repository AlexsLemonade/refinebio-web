import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links, options } from 'config'

export const TransformationOptions = () => {
  const { setResponsive } = useResponsive()
  const [transformationOption, setTransformationOption] = useState(
    options.transformation[0].value
  )

  return (
    <>
      <Box
        margin={{
          top: setResponsive('small', 'none'),
          left: setResponsive('none', 'medium')
        }}
      >
        <Text>
          Transformation{' '}
          <Anchor
            href={links.refinebio_docs_transformation}
            title="What does transformation mean?"
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
        width="150px"
      >
        <Select
          options={Object.values(options.transformation)}
          labelKey="label"
          value={transformationOption}
          valueKey={{ key: 'value', reduce: true }}
          margin={{ horizontal: 'xxsmall' }}
          onChange={({ value: nextValue }) =>
            setTransformationOption(nextValue)
          }
        />
      </Box>
    </>
  )
}

export default TransformationOptions
