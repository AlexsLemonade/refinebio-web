import { useEffect, useState } from 'react'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import fetchSearch from 'helpers/fetchSearch'
import getAccessionCodesQueryParam from 'helpers/getAccessionCodesQueryParam'
import getSearchQueryForAPI from 'helpers/getSearchQueryForAPI'
import { Box, Grid, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { BoxBlock } from 'components/shared/BoxBlock'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerResponsive'
import { Icon } from 'components/shared/Icon'
import { PageTitle } from 'components/shared/PageTitle'
import { Pagination } from 'components/shared/Pagination'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchInfoBanner } from 'components/SearchResults/SearchInfoBanner'
import { SearchCard } from 'components/SearchCard'
import {
  MissingResultsAlert,
  NoFilteringResults,
  NoSearchResults,
  SearchBulkActions,
  SearchFilterList
} from 'components/SearchResults'
import { options } from 'config'

export const Search = (props) => {
  const {
    search: { pageSizes, sortby }
  } = options
  const { query, results, accessionCodesResult } = props
  const {
    formatFacetNames,
    getSearchQueryParam,
    hasAppliedFilters,
    setConfig,
    setSearch,
    updatePage,
    updateSearchTerm
  } = useSearchManager()
  const { viewport, setResponsive } = useResponsive()
  const sideWidth = '300px'
  const searchBoxWidth = '550px'
  const [toggleFilterList, setToggleFilterList] = useState(false)
  const [userSearchTerm, setUserSearchTerm] = useState(query.search || '')
  const [page, setPage] = useState(Number(query.p) || 1)
  const [pageSize, setPageSize] = useState(Number(query.size) || pageSizes[0])
  const [sortBy, setSortBy] = useState(query.sortby || sortby[0].value)

  const isResults = results.results.length > 0

  const handleClearSearchTerm = () => {
    if (query.search) {
      updateSearchTerm('')
    }

    setUserSearchTerm('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearchTerm(userSearchTerm)
  }

  useEffect(() => {
    if (props) {
      if (results) {
        const facetNames = formatFacetNames(Object.keys(results.facets))

        setConfig({
          filterOptions: facetNames
        })

        if (query) {
          setSearch({
            ...getSearchQueryParam(query)
          })
        }
      }
    }
  }, [])

  return (
    <>
      <PageTitle title={`${query.search ? query.search : ''} Results -`} />
      <TextHighlightContextProvider
        match={[query.search, ...getAccessionCodesQueryParam(query.search)]}
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
              value={userSearchTerm}
              responsive
              clickHandler={handleClearSearchTerm}
              changeHandler={(e) => setUserSearchTerm(e.target.value)}
              submitHandler={handleSubmit}
            />
          </Box>

          {results && isResults && (
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
                show={toggleFilterList}
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
                        onClick={() => setToggleFilterList(false)}
                      >
                        <Icon name="Close" size="large" />
                      </Box>
                    </Box>
                  )}
                  <SearchFilterList
                    facets={results.facets}
                    setToggle={setToggleFilterList}
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
                    onClick={() => setToggleFilterList(true)}
                  />
                )}
                <SearchBulkActions
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  totalResults={results.count}
                />

                {accessionCodesResult.length > 0 && (
                  <>
                    {accessionCodesResult.map((data) =>
                      data.results.map((result) => (
                        <SearchCard key={result.id} result={result} />
                      ))
                    )}
                    <Box
                      border={{ color: 'gray-shade-5', side: 'top' }}
                      margin={{ vertical: 'large' }}
                      style={{ position: 'relative' }}
                    >
                      <Heading
                        level={3}
                        style={{ position: 'absolute', top: '-12px' }}
                      >
                        Related Results for '{query.search}'
                      </Heading>
                    </Box>
                  </>
                )}
                <Box animation={{ type: 'fadeIn', duration: 300 }}>
                  {results.results.map((result) => (
                    <SearchCard key={result.id} result={result} />
                  ))}
                  {results.results.length < 10 && <MissingResultsAlert />}
                </Box>
                <Box
                  align="center"
                  direction="row"
                  justify="center"
                  margin={{ top: 'medium' }}
                >
                  <Pagination
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    totalPages={results.count}
                    updatePage={updatePage}
                  />
                </Box>
              </Box>
            </Grid>
          )}

          {results && !isResults && hasAppliedFilters() && (
            <Box direction="row">
              <SearchFilterList
                facets={results.facets}
                setToggle={setToggleFilterList}
                style={{ height: 'auto' }}
              />
              <Box width="80%">
                <NoFilteringResults />
              </Box>
            </Box>
          )}

          {results && !isResults && !hasAppliedFilters() && query.search && (
            <NoSearchResults setUserSearchTerm={setUserSearchTerm} />
          )}
        </FixedContainer>
      </TextHighlightContextProvider>
    </>
  )
}

Search.getInitialProps = async (ctx) => {
  const { pathname, query } = ctx
  const {
    search: {
      commonQueries: {
        limit,
        offset,
        ordering,
        num_downloadable_samples__gt: numDownloadableSamples
      }
    }
  } = options

  const queryString = {
    ...getSearchQueryForAPI(query),
    limit: query.size || Number(limit),
    offset: (query.p - 1) * (query.size || Number(offset)) || Number(offset),
    ordering: query.sortby || ordering,
    ...(query.search ? { search: query.search } : {}),
    num_downloadable_samples__gt: !query.empty
      ? Number(numDownloadableSamples.hide)
      : Number(numDownloadableSamples.show)
  }
  const { response, accessionCodesResponse } = await fetchSearch(queryString)

  return {
    pathname,
    query,
    results: response,
    accessionCodesResult: accessionCodesResponse
  }
}

export default Search
