import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { MissingResultsFormButton } from './MissingResultsFormButton'

export const NoMatchingResults = () => {
  const { clearAllFilters } = useSearchManager()
  const { setResponsive } = useResponsive()

  return (
    <Box
      align="center"
      animation={{ type: 'fadeIn', duration: 500 }}
      margin={{ top: 'basex8' }}
    >
      <Heading level={1} margin={{ bottom: 'small' }}>
        No Matching Results
      </Heading>
      <Box direction="row" gap="xsmall" margin={{ top: 'small' }}>
        <Paragraph size={setResponsive('16x', '22px')}>
          Expecting a specific experiment?{' '}
        </Paragraph>
        <MissingResultsFormButton size={setResponsive('16px', '22px')} />
      </Box>
      <Paragraph size={setResponsive('16px', '22px')}>Or</Paragraph>
      <Box direction="row" gap="xsmall" margin={{ top: 'small' }}>
        <Paragraph size={setResponsive('16px', '22px')}>
          Try another term or
        </Paragraph>
        <Button
          label="Clear Filters"
          link
          linkFontSize={setResponsive('16px', '22px')}
          onClick={clearAllFilters}
        />
      </Box>
      <Box
        margin={{
          top: setResponsive('basex6', 'basex8'),
          bottom: 'xlarge'
        }}
        aria-hidden
        background={{
          image: "url('/ghost-sample.svg')",
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        // to preserve the height of SVG image
        height={setResponsive('250px', '350px')}
        width="100%"
      />
    </Box>
  )
}

export default NoMatchingResults
