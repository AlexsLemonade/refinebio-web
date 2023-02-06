import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'

export const TransformOptions = () => {
  const { setResponsive } = useResponsive()
  const transformOptions = ['None', 'Zero to One', 'Z-score']
  const [optionTransformation, setOptionTransformation] = useState(
    transformOptions[0]
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
            title="What does transfirmation mean?"
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
          options={transformOptions}
          value={optionTransformation}
          onChange={({ option }) => setOptionTransformation(option)}
        />
      </Box>
    </>
  )
}

export default TransformOptions
