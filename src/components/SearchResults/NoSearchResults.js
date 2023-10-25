import { Box, Heading, Paragraph, Text } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { RequestSearchFormButton } from './RequestSearchFormButton'

export const NoSearchResults = ({ queryTerm, setUserSearchTerm }) => {
  const { updateSearchTerm } = useSearchManager()
  const { setResponsive } = useResponsive()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']

  const handleClick = (newTerm) => {
    setUserSearchTerm(newTerm)
    updateSearchTerm(newTerm)
  }

  return (
    <Box
      align="center"
      animation={{ type: 'fadeIn', duration: 500 }}
      margin={{ top: setResponsive('large', 'basex8') }}
    >
      <Heading level={1} margin={{ bottom: 'small' }}>
        No Matching Results
        <Box margin={{ top: 'small' }} align="center">
          Try another term
        </Box>
      </Heading>
      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        gap={setResponsive('none', 'medium')}
      >
        {queries.map((query) => (
          <Button
            key={query}
            label={<Text size="xlarge">{query}</Text>}
            link
            linkFontSize={setResponsive('16px', '20px')}
            underlineOnHover
            margin={{ top: setResponsive('small') }}
            onClick={() => handleClick(query)}
          />
        ))}
      </Box>
      <Box direction="row" gap="xsmall" margin={{ top: 'small' }}>
        <Paragraph size={setResponsive('16x', '22px')}>
          Expecting a specific experiment?{' '}
        </Paragraph>
        <RequestSearchFormButton
          queryTerm={queryTerm}
          size={setResponsive('16px', '22px')}
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

export default NoSearchResults
