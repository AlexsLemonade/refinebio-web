import { getHeadingSize } from 'helpers/getHeadingSize'
import { Box, Heading, Text } from 'grommet'
import styled, { css } from 'styled-components'

export const VersionList = styled(Box)`
  ${({ theme }) => css`
    > div:nth-of-type(odd) {
      background: ${theme.global.colors['gray-shade-5']};
    }
  `}
`
export const VersionItem = ({ title, version, versions }) => {
  return (
    <Box direction={version ? 'row' : 'column'} pad={{ vertical: 'xsmall' }}>
      <Box width={{ min: '160px' }}>
        <Heading level={5} size={getHeadingSize('small', 5)} weight="500">
          {title}
        </Heading>
      </Box>
      {versions &&
        Object.keys(versions).map((v) => (
          <Box key={v} direction="row">
            <Box margin={{ right: 'medium' }} width={{ min: '160px' }}>
              <Text textAlign="end">{v}</Text>
            </Box>
            <Box>
              <Text>{versions[v]}</Text>
            </Box>
          </Box>
        ))}
      {version && (
        <Box margin={{ left: 'medium' }}>
          <Text>{version}</Text>
        </Box>
      )}
    </Box>
  )
}
