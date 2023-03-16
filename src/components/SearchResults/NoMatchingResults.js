import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'

export const NoMatchingResults = ({ handleClearFilter }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center" margin={{ top: 'basex8' }}>
      <Heading
        level={1}
        margin={{ bottom: 'small' }}
        size={setResponsive('h1_xsmall', 'h1_small')}
      >
        No Matching Results
      </Heading>
      <Paragraph size={setResponsive('16x', '22px')}>
        Expecting a specific experiment?{' '}
        <Anchor label="Let us know" href="/missing-results" />
      </Paragraph>
      <Paragraph size={setResponsive('16px', '22px')}>Or</Paragraph>
      <Box direction="row" gap="xsmall" margin={{ top: 'small' }}>
        <Paragraph size={setResponsive('16px', '22px')}>
          Try another term or
        </Paragraph>
        <Button
          label="Clear Filters"
          onClick={handleClearFilter}
          link
          linkFontSize={setResponsive('16px', '22px')}
          textDecoration="none"
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
