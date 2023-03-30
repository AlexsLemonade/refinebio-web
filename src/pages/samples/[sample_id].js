import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from 'api'
import { Box, Spinner } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SampleDebug, SampleDetails } from 'components/Sample'

export const Sample = () => {
  const router = useRouter()
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
    <FixedContainer height={{ min: '50%' }}>
      <Box margin={{ vertical: 'large' }}>
        <Button
          label="Back to Results"
          secondary
          responsive
          onClick={() => {
            router.back()
          }}
        />
      </Box>
      {loading ? (
        <Box align="center" fill justify="center">
          <Spinner
            color="gray-shade-70"
            message={{ start: 'Loading data', end: 'Data loaded' }}
          />
        </Box>
      ) : (
        <>
          {sample && (
            <SampleDetails accessionCode={accessionCode} sample={sample} />
          )}
          {accessionCode && (
            <Box margin={{ top: 'large', bottom: 'basex6' }}>
              <SampleDebug accessionCode={accessionCode} />
            </Box>
          )}
        </>
      )}
    </FixedContainer>
  )
}

export default memo(Sample)
