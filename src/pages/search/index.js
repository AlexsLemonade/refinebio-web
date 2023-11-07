import { Fragment, useEffect, useState } from 'react'
import { Box, Grid, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import fetchSearch from 'helpers/fetchSearch'
import getAccessionCodesQueryParam from 'helpers/getAccessionCodesQueryParam'
import getSearchQueryForAPI from 'helpers/getSearchQueryForAPI'
import { Button } from 'components/shared/Button'
import { BoxBlock } from 'components/shared/BoxBlock'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerResponsive'
import { Icon } from 'components/shared/Icon'
import { PageTitle } from 'components/shared/PageTitle'
import { Pagination } from 'components/shared/Pagination'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchInfoBanner } from 'components/SearchResults/SearchInfoBanner'
import { SearchCard } from 'components/shared/SearchCard'
import {
  RequestSearchFormAlert,
  NoSearchResults,
  SearchBulkActions,
  SearchFilterList
} from 'components/SearchResults'
import { options } from 'config'

export const Search = (props) => {
  const {
    search: { pageSizes, sortby }
  } = options
  const { query, results, totalResults, facets } = props
  const {
    formatFacetNames,
    getSearchQueryParam,
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
  const isResults = results?.length > 0

  const handleClearSearchTerm = () => {
    if (query.search) {
      updateSearchTerm('')
    }

    setUserSearchTerm('')
  }

  const handleSetPage = (newPage) => {
    setPage(newPage)
    updatePage(newPage)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearchTerm(userSearchTerm)
  }

  useEffect(() => {
    if (props) {
      if (facets) {
        const facetNames = formatFacetNames(Object.keys(facets))

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
              onClick={handleClearSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
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
                    facets={facets}
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
                  results={results}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  totalResults={totalResults}
                />
                <Box animation={{ type: 'fadeIn', duration: 300 }}>
                  {results.map((result, i) =>
                    result.isMatchedAccessionCode ? (
                      <Fragment key={result.id}>
                        <SearchCard key={result.id} result={result} />
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
                                Related Results for '{query.search}'
                              </Heading>
                            </Box>
                          )}
                      </Fragment>
                    ) : (
                      <SearchCard key={result.id} result={result} />
                    )
                  )}
                  {(results.length < 10 ||
                    page === Math.ceil(totalResults / pageSize)) && (
                    <RequestSearchFormAlert />
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
                    pageSize={pageSize}
                    totalPages={totalResults}
                    setPage={handleSetPage}
                  />
                </Box>
              </Box>
            </Grid>
          )}
          {!isResults && query.search && (
            <NoSearchResults
              queryTerm={query.search}
              setUserSearchTerm={setUserSearchTerm}
            />
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

  const filterOrders = query.filter_order ? query.filter_order.split(',') : []
  const queryString = {
    ...getSearchQueryForAPI(query),
    limit: query.size || Number(limit),
    offset: (query.p - 1 || Number(offset)) * (query.size || Number(limit)),
    ordering: query.sortby || ordering,
    ...(query.search ? { search: query.search } : {}),
    num_downloadable_samples__gt: !query.empty
      ? Number(numDownloadableSamples.hide)
      : Number(numDownloadableSamples.show)
  }

  const { facets, results, totalResults } = await fetchSearch(
    queryString,
    Number(query.p) || 1,
    filterOrders
  )

  return {
    pathname,
    query,
    facets,
    results,
    totalResults
  }
}

export default Search
