import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Text } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Button } from 'components/shared/Button'

export const CompendiaNormalizedTab = () => {
  const { setResponsive } = useResponsive()

  return (
    <FixedContainer
      pad={{
        horizontal: setResponsive('large', 'medium', 'basex15'),
        top: setResponsive('basex7', 'basex7', 'basex9'),
        bottom: setResponsive('basex7', 'basex7', 'basex9')
      }}
    >
      <Box
        align="center"
        pad={{
          bottom: setResponsive('basex7', 'basex7', 'basex9')
        }}
      >
        <Heading
          level={2}
          margin={{ bottom: setResponsive('medium', 'large') }}
          size={setResponsive('h2_small', 'h2_large')}
          textAlign="center"
        >
          The normalized compendia is created by aggregating all samples from a
          species, removing samples and genes with too many missing values, and
          imputing missing values with SVD impute. The final step is quantile
          normalization.
        </Heading>
        <Button label="Learn More" secondary responsive />
      </Box>
      <Box align="center">
        <Heading
          level={2}
          margin={{ bottom: setResponsive('medium', 'large') }}
          size={setResponsive('h2_small', 'h2_large')}
          textAlign="center"
        >
          Data scientists and computational biologists can use the normalized
          compendia to quickly construct training and testing sets and extract
          features from a diverse set of biological contexts and conditions
        </Heading>
        <Text>
          <i>Examples Coming soon</i>
        </Text>
      </Box>
    </FixedContainer>
  )
}

export default CompendiaNormalizedTab