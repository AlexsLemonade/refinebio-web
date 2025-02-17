import { memo, useEffect, useState, useRef } from 'react'
import { Box } from 'grommet'
import { useRouter } from 'next/router'
import { useLayoutRefs } from 'hooks/useLayoutRefs'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { api } from 'api'
import scrollTo from 'helpers/scrollTo'
import { Button } from 'components/Button'
import { FixedContainer } from 'components/FixedContainer'
import { PageTitle } from 'components/PageTitle'
import { Spinner } from 'components/Spinner'
import { ExperimentDetail } from 'components/ExperimentDetail'
import { ExperimentSamplesTable } from 'components/ExperimentSamplesTable'

export const Experiment = ({ experiment }) => {
  const { accession_code: accessionCode } = experiment
  const {
    back,
    query: { ref }
  } = useRouter()
  const fromFooter = ref === 'view-samples'
  const fromSearch = ref === 'search' || fromFooter
  const { setResponsive } = useResponsive()
  const { searchParams } = useSearchManager()
  const { headerRef } = useLayoutRefs()
  const tableContainerRef = useRef(null)
  const [hasSamples, setHasSamples] = useState(false)

  const scrollToTable = () => {
    const offset = (headerRef.current.offsetHeight || 0) + 10
    const tableTop = tableContainerRef.current
      ? tableContainerRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset
      : 0
    scrollTo({
      top: tableTop
    })
  }

  // prevents hydration error on page load for SamplesTable
  useEffect(() => {
    setHasSamples(experiment.samples.length > 0)
  }, [hasSamples])

  useEffect(() => {
    if (!fromFooter || !hasSamples || !tableContainerRef.current) return
    // triggers initial scrolling
    scrollToTable()
    // watches layout changes and updates scroll position
    const resizeObserver = new ResizeObserver(() => scrollToTable())
    resizeObserver.observe(document.body)

    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.disconnect()
    }
  }, [fromFooter, hasSamples])

  if (!hasSamples) return <Spinner />

  return (
    <>
      <PageTitle title={`${`${accessionCode} - ${experiment.title}`} -`} />
      <TextHighlightContextProvider match={fromSearch && searchParams.search}>
        <Box height={{ min: '50%' }}>
          <FixedContainer pad="large">
            {fromSearch && (
              <Button
                label="Back to Results"
                secondary
                responsive
                onClick={back}
              />
            )}
          </FixedContainer>
          <ExperimentDetail experiment={experiment} />
          <Box ref={tableContainerRef}>
            <FixedContainer>
              <Box
                elevation="medium"
                pad={setResponsive('medium', 'large')}
                margin={{ bottom: 'basex6' }}
              >
                <ExperimentSamplesTable experiment={experiment} />
              </Box>
            </FixedContainer>
          </Box>
        </Box>
      </TextHighlightContextProvider>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const response = await api.experiments.get(query.accessionCode)

  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: { experiment: response }
  }
}

export default memo(Experiment)
