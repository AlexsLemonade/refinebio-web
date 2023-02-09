import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'
import { getHumanReadable } from 'helpers/getHumanReadable'

export const TransformationOptions = () => {
  const { setResponsive } = useResponsive()
  const transformationOptionValues = {
    NONE: 'None',
    MINMAX: 'Zero to One',
    STANDARD: 'Z-score'
  }
  const transformationOptions = Object.keys(transformationOptionValues).map(
    (option) => getHumanReadable(option, transformationOptionValues)
  )
  const [selectedTransformation, setSelectedTransformation] = useState(
    transformationOptions[0]
  )

  // NOTE: when calling API, use helpers/getAPIReadable to get the API value
  // e.g.) getAPIReadable(selectedTransformation, transformationOptionValues)

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
          options={transformationOptions}
          value={selectedTransformation}
          onChange={({ option }) => setSelectedTransformation(option)}
        />
      </Box>
    </>
  )
}

export default TransformationOptions
