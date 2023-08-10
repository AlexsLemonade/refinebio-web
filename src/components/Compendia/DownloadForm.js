import { memo } from 'react'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Download } from './Download'

export const DownloadForm = ({ type }) => {
  const { setResponsive } = useResponsive()
  const isNormalized = type === 'normalized'
  const svgImage = isNormalized
    ? 'normalizaed-curve.svg'
    : 'gene-expression-matrix.svg'
  const heading = isNormalized
    ? 'Normalized Compendia'
    : 'RNA-seq Sample Compendia'
  const paragraph = (
    <Paragraph color="white" size="xlarge">
      {isNormalized ? (
        'Normalized Compendia are the collection of all the samples available on refine.bio, aggregated and normalized by species.'
      ) : (
        <>
          Get the collection of Salmon output as{' '}
          <Text
            color="coral-shade-20"
            size="xlarge"
            style={{ background: '#aac4e4' }}
          >
            quant.sf
          </Text>{' '}
          files for an organism's RNA-seq samples for maximum flexibility.
        </>
      )}
    </Paragraph>
  )

  return (
    <Box margin={{ top: 'basex12' }}>
      <Box
        background="gradientBlueDark"
        pad={{
          top: 'basex8',
          bottom: 'xlarge'
        }}
      >
        <FixedContainer>
          <Box
            background={{
              image: `url(/${svgImage})`,
              position: 'center',
              repeat: 'no-repeat',
              size: '100%'
            }}
            height="106px"
            width="106px"
            style={{
              top: '-112px',
              left: '50%',
              position: 'absolute',
              transform: 'translateX(-50%)'
            }}
          />
          <Heading
            level={2}
            color="white"
            margin={{ bottom: 'medium' }}
            size={setResponsive('small', 'large')}
            style={{ textShadow: '0 3px 19px rgba(0,0,0,.5)' }}
            alignSelf="center"
          >
            {heading}
          </Heading>
          <Row direction={setResponsive('column', 'column', 'row')}>
            <Column margin={{ right: setResponsive('none', 'none', 'xlarge') }}>
              {paragraph}
            </Column>
            <Column
              margin={{
                top: setResponsive('medium', 'medium', 'none'),
                left: setResponsive('none', 'none', 'xlarge')
              }}
              width="100%"
            >
              <Download heading={heading} isNormalized={isNormalized} />
            </Column>
          </Row>
        </FixedContainer>
      </Box>
    </Box>
  )
}

export default memo(DownloadForm)
