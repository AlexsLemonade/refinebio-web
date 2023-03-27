import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from 'api'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Grid, Spinner } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SearchCardHeader } from 'components/SearchCard/SearchCardHeader'
import { SearchCardMeta } from 'components/SearchCard/SearchCardMeta'
import { SampleMetadataFields } from 'components/Sample'

export const Sample = () => {
  const router = useRouter()
  const { setResponsive } = useResponsive()
  const [sample, setSample] = useState(null)
  const [accessionCode, setAccessionCode] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    // endpoints:
    // `v1/samples/${accession_code}/`
    const getSample = async (param) => {
      const result = await api.samples.get(param)
      setSample(result)
      setLoading(false)
    }

    if (router.isReady) {
      setAccessionCode(router.query.sample_id)
      getSample(router.query.sample_id)
    }
  }, [router.isReady])

  return (
    <Box height={{ min: '50%' }}>
      <FixedContainer pad="large">
        <Button
          label="Back to Results"
          secondary
          responsive
          onClick={() => {
            router.back()
          }}
        />
      </FixedContainer>

      {loading ? (
        <Box align="center" fill justify="center" margin={{ top: 'large' }}>
          <Spinner
            color="gray-shade-70"
            message={{ start: 'Loading data', end: 'Data loaded' }}
          />
        </Box>
      ) : (
        sample && (
          <Box>
            <FixedContainer>
              <Box elevation="medium" pad="large" margin={{ bottom: 'basex6' }}>
                <Grid
                  areas={setResponsive(
                    [
                      { name: 'header', start: [0, 0], end: [1, 0] },
                      { name: 'meta', start: [0, 1], end: [1, 1] },
                      { name: 'ctas', start: [0, 2], end: [1, 2] }
                    ],
                    [
                      { name: 'header', start: [0, 0], end: [0, 1] },
                      { name: 'ctas', start: [1, 0], end: [1, 1] },
                      { name: 'meta', start: [0, 2], end: [1, 2] }
                    ]
                  )}
                  columns={['1fr', 'auto']}
                  rows={['auto', 'auto', 'auto']}
                  gap={{
                    row: setResponsive('small', 'medium'),
                    column: 'medium'
                  }}
                  margin={{ bottom: 'medium' }}
                >
                  <Box gridArea="header">
                    <SearchCardHeader
                      accessionCode={accessionCode}
                      title="Sample Details"
                      isLinked={false}
                    />
                  </Box>
                  <Box
                    gridArea="ctas"
                    margin={{ top: setResponsive('none', 'large') }}
                  />
                  <Box gridArea="meta">
                    <SearchCardMeta
                      organismNames={[sample.organism.name]}
                      platformNames={[sample.platform_name]}
                      technology={sample.technology}
                      size="medium"
                    />
                  </Box>
                </Grid>
                <SampleMetadataFields sample={sample} />
              </Box>
            </FixedContainer>
          </Box>
        )
      )}
    </Box>
  )
}

export default memo(Sample)
