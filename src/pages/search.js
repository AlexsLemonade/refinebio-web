import { Fragment, useEffect, useState } from 'react'
import { Box, Grid, Heading } from 'grommet'
import { useSyncSearchURL } from 'hooks/useSyncSearchURL'
import gtag from 'analytics/gtag'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import fetchSearch from 'helpers/fetchSearch'
import formatFacetQueryParams from 'helpers/formatFacetQueryParams'
import { getTranslateFacetNames } from 'helpers/facetNameTranslation'
import getParsedAccessionCodes from 'helpers/getParsedAccessionCodes'
import getPageNumber from 'helpers/getPageNumber'
import parseDefaultSearchParams from 'helpers/parseDefaultSearchParams'
import { isLegacyUrl, getNewQueryParams } from 'helpers/supportLegacyUrl'
import { Button } from 'components/Button'
import { BoxBlock } from 'components/BoxBlock'
import { ExperimentCard } from 'components/ExperimentCard'
import { FixedContainer } from 'components/FixedContainer'
import { Icon } from 'components/Icon'
import { LayerResponsive } from 'components/LayerResponsive'
import { PageTitle } from 'components/PageTitle'
import { Pagination } from 'components/Pagination'
import { SearchBox } from 'components/SearchBox'
import { SearchBulkActions } from 'components/SearchBulkActions'
import { SearchFilterList } from 'components/SearchFilterList'
import { SearchInfoBanner } from 'components/SearchInfoBanner'
import { SearchNoResults } from 'components/SearchNoResults'
import { SearchRequestFormAlert } from 'components/SearchRequestFormAlert'
import { Spinner } from 'components/Spinner'

export const Search = ({ query, response }) => {
  const { setFacetNames, setSearchParams, updatePage, updateSearchTerm } =
    useSearchManager()
  const { viewport, setResponsive } = useResponsive()
  const sideWidth = '300px'
  const searchBoxWidth = '550px'

  // syncs the latest search parameters with URL
  useSyncSearchURL(query)

  const { limit } = query
  const page = getPageNumber(query.offset, limit)
  const search = query.search || ''

  const { facets, results, totalResults } = response
  const isResults = results?.length > 0

  const [showMobileFilterList, setShowMobileFilterList] = useState(false) // for small devices

  // TODO: Remove when refactring search in a future issue (prevent hydration error)
  const [isPageReady, setIsPageReady] = useState(false)

  const handleSubmit = (val) => {
    updateSearchTerm(val)
  }

  useEffect(() => {
    setIsPageReady(true)
  }, [])

  useEffect(() => {
    if (facets) {
      // NOTE: We need to rename facet keys to match filter
      // We'll remove these helpers in the future (1/16/2025)
      setFacetNames(getTranslateFacetNames(Object.keys(facets)))
    }
    if (query) {
      setSearchParams(formatFacetQueryParams(Object.keys(facets), query))
      gtag.trackSearchQuery(query)
    }
  }, [facets, query])

  // TODO: Remove when refactring search in a future issue
  if (!isPageReady) return <Spinner />

  return (
    <>
      <PageTitle title={`${search} Results -`} />
      <TextHighlightContextProvider
        match={[search, ...getParsedAccessionCodes(search)]}
      >
        <FixedContainer pad={{ horizontal: 'large', bottom: 'large' }}>
          <SearchInfoBanner />
          <Box
            alignSelf="center"
            margin={{
              top: 'medium',
              bottom: setResponsive('medium', 'medium', 'xlarge')
            }}
            width={setResponsive('100%', searchBoxWidth)}
            style={{ position: 'relative' }}
          >
            <SearchBox
              placeholder="Search accessions, pathways, diseases, etc.,"
              btnType="primary"
              size="large"
              value={search}
              responsive
              onSubmit={handleSubmit}
            />
          </Box>
          {isResults && (
            <Grid
              areas={[
                { name: 'side', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] }
              ]}
              columns={setResponsive(['auto'], ['auto'], [sideWidth, 'auto'])}
              rows={['auto', 'auto']}
              gap={{
                row: 'none',
                column: setResponsive('none', 'none', '2%')
              }}
            >
              <LayerResponsive
                position="left"
                show={showMobileFilterList}
                tabletMode
              >
                <BoxBlock
                  gridArea="side"
                  height={setResponsive('100vh', '100vh', 'auto')}
                  margin={{ top: 'large' }}
                  pad={{
                    left: setResponsive('basex7', 'basex7', 'none'),
                    right: setResponsive('basex7', 'basex7', 'large'),
                    top: setResponsive('large', 'large', 'none')
                  }}
                  // TODO: dynamically set the max height for laptop / desktop devices based on vh and page sizes
                  width={setResponsive('100vw', '100vw', sideWidth)}
                  style={{ overflowY: 'auto' }}
                >
                  {viewport !== 'large' && (
                    <Box align="end" margin={{ bottom: 'small' }}>
                      <Box
                        aria-label="Close Filters"
                        role="button"
                        style={{ boxShadow: 'none' }}
                        width="max-content"
                        onClick={() => setShowMobileFilterList(false)}
                      >
                        <Icon name="Close" size="large" />
                      </Box>
                    </Box>
                  )}
                  <SearchFilterList
                    facets={facets}
                    onToggle={() => setShowMobileFilterList(false)}
                  />
                </BoxBlock>
              </LayerResponsive>
              <Box gridArea="main" height={{ min: '85vh' }}>
                {viewport !== 'large' && (
                  <Button
                    aria-label="Open Filters"
                    label="Filter"
                    icon={<Icon name="Filter" size="small" />}
                    margin={{ bottom: 'medium' }}
                    secondary
                    onClick={() => setShowMobileFilterList(true)}
                  />
                )}
                <SearchBulkActions response={response} query={query} />
                <Box animation={{ type: 'fadeIn', duration: 300 }}>
                  {results.map((result, i) =>
                    result.isMatchedAccessionCode ? (
                      <Fragment key={result.accession_code}>
                        <ExperimentCard
                          key={result.accession_code}
                          experiment={result}
                        />
                        {results[i + 1] &&
                          !results[i + 1].isMatchedAccessionCode && (
                            <Box
                              border={{ color: 'gray-shade-5', side: 'top' }}
                              margin={{ vertical: 'large' }}
                              style={{ position: 'relative' }}
                            >
                              <Heading
                                level={3}
                                style={{ position: 'absolute', top: '-12px' }}
                              >
                                Related Results for '{search}'
                              </Heading>
                            </Box>
                          )}
                      </Fragment>
                    ) : (
                      <ExperimentCard
                        key={result.accession_code}
                        experiment={result}
                      />
                    )
                  )}
                  {(results.length < 10 ||
                    page === Math.ceil(totalResults / limit)) && (
                    <SearchRequestFormAlert />
                  )}
                </Box>

                <Box
                  align="center"
                  direction="row"
                  justify="center"
                  margin={{ top: 'medium' }}
                >
                  <Pagination
                    page={page}
                    pageSize={limit}
                    totalPages={totalResults}
                    onPageChange={updatePage}
                  />
                </Box>
              </Box>
            </Grid>
          )}
          {!isResults && search && <SearchNoResults />}
        </FixedContainer>
      </TextHighlightContextProvider>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  if (isLegacyUrl(query)) {
    const newQueryParams = getNewQueryParams(query)

    return {
      redirect: {
        destination: `/search/?${new URLSearchParams(
          newQueryParams
        ).toString()}`,
        permanent: true
      }
    }
  }

  const queryParams = parseDefaultSearchParams(query)
  const filterOrders = query.filter_order ? query.filter_order.split(',') : []
  const response = await fetchSearch(queryParams, filterOrders)

  if (response && response.ok) {
    return {
      props: {
        query: { ...query, ...queryParams },
        response
      }
    }
  }

  return { notFound: true }
}

export default Search
