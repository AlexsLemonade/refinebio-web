import { memo } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { links } from 'config'
import { CompendiaDownloadBlock } from './CompendiaDownloadBlock'

export const CompendiaNormalizedTab = ({ type = 'normalized' }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box animation={{ type: 'fadeIn', duration: 350, delay: 200 }}>
      <CompendiaDownloadBlock type={type} />
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
            size={setResponsive('small', 'large')}
            textAlign="center"
          >
            The normalized compendia is created by aggregating all samples from
            a species, removing samples and genes with too many missing values,
            and imputing missing values with SVD impute. The final step is
            quantile normalization.
          </Heading>
          <Button
            aria-label="Go to the refinebio docs - Normalized Compendia"
            href={links.refinebio_docs_normalized_compendia}
            label="Learn More"
            secondary
            responsive
            rel="noopener noreferrer"
            target="_blank"
          />
        </Box>
        <Box align="center">
          <Heading
            level={2}
            margin={{ bottom: setResponsive('medium', 'large') }}
            size={setResponsive('small', 'large')}
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
    </Box>
  )
}

export default memo(CompendiaNormalizedTab)
