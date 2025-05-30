import { memo } from 'react'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { useCompendiaContext } from 'hooks/useCompendiaContext'
import { useResponsive } from 'hooks/useResponsive'
import getReadable from 'helpers/getReadable'
import { Column } from 'components/Column'
import { CompendiaDownloadBlockForm } from 'components/CompendiaDownloadBlockForm'
import { FixedContainer } from 'components/FixedContainer'
import { Row } from 'components/Row'

export const CompendiaDownloadBlock = () => {
  const { setResponsive } = useResponsive()
  const { type } = useCompendiaContext()

  const texts = {
    normalized:
      'Normalized Compendia are the collection of all the samples available on refine.bio, aggregated and normalized by species.',
    'rna-seq': (
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
    )
  }
  const svgs = {
    normalized: 'normalizaed-curve.svg',
    'rna-seq': 'gene-expression-matrix.svg'
  }

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
              image: `url(/${svgs[type]})`,
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
            margin={{ bottom: 'xlarge' }}
            size={setResponsive('small', 'large')}
            style={{ textShadow: '0 3px 19px rgba(0,0,0,.5)' }}
            alignSelf="center"
          >
            {getReadable(type)}
          </Heading>
          <Row direction={setResponsive('column', 'column', 'row')}>
            <Column margin={{ right: setResponsive('none', 'none', 'xlarge') }}>
              <Paragraph color="white" size="xlarge">
                {texts[type]}
              </Paragraph>
            </Column>
            <Column
              margin={{
                top: setResponsive('medium', 'medium', 'none'),
                left: setResponsive('none', 'none', 'xlarge')
              }}
              width="100%"
            >
              <CompendiaDownloadBlockForm />
            </Column>
          </Row>
        </FixedContainer>
      </Box>
    </Box>
  )
}

export default memo(CompendiaDownloadBlock)
