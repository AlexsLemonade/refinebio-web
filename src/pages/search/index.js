import { Fragment, useEffect, useState } from 'react'
import { Box, Grid, Heading } from 'grommet'
import gtag from 'analytics/gtag'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import fetchSearch from 'helpers/fetchSearch'
import formatFacetQueryParams from 'helpers/formatFacetQueryParams'
import getAccessionCodesQueryParam from 'helpers/getAccessionCodesQueryParam'
import getPageNumber from 'helpers/getPageNumber'
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
import { Spinner } from 'components/shared/Spinner'
import {
  RequestSearchFormAlert,
  NoSearchResults,
  SearchBulkActions,
  SearchFilterList
} from 'components/SearchResults'

export const Search = ({ query, response }) => {
  const { setFacetNames, setSearchParams, updatePage, updateSearchTerm } =
    useSearchManager()
  const { viewport, setResponsive } = useResponsive()
  const sideWidth = '300px'
  const searchBoxWidth = '550px'

  const limit = Number(query.limit)
  const page = getPageNumber(query.offset, limit)
  const search = query.search || ''
  const [userSearchTerm, setUserSearchTerm] = useState(search)

  const { facets, results, totalResults } = response
  const isResults = results?.length > 0

  const [toggleFilterList, setToggleFilterList] = useState(false) // for small devices

  // TODO: Remove when refactring search in a future issue (prevent hydration error)
  const [isPageReady, setIsPageReady] = useState(false)

  const handleClearSearchTerm = () => {
    setUserSearchTerm('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearchTerm(userSearchTerm)
  }
  useEffect(() => {
    setIsPageReady(true)
  }, [])

  useEffect(() => {
    if (facets) setFacetNames(Object.keys(facets))
    if (query) {
      setSearchParams(query)
      setUserSearchTerm(search) // resets previous input value
      gtag.trackSearchQuery(query)
    }
  }, [facets, query])

  // TODO: Remove when refactring search in a future issue
  if (!isPageReady) return <Spinner />

  return (
    <>
      <PageTitle title={`${search || ''} Results -`} />
      <TextHighlightContextProvider
        match={[search, ...getAccessionCodesQueryParam(search)]}
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
                <SearchBulkActions response={response} query={query} />
                <Box animation={{ type: 'fadeIn', duration: 300 }}>
                  {results.map((result, i) =>
                    result.isMatchedAccessionCode ? (
                      <Fragment key={result.accession_code}>
                        <SearchCard
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
                      <SearchCard
                        key={result.accession_code}
                        experiment={result}
                      />
                    )
                  )}
                  {(results.length < 10 ||
                    page === Math.ceil(totalResults / limit)) && (
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
                    pageSize={limit}
                    totalPages={totalResults}
                    onPageChange={updatePage}
                  />
                </Box>
              </Box>
            </Grid>
          )}
          {!isResults && search && (
            <NoSearchResults setUserSearchTerm={setUserSearchTerm} />
          )}
        </FixedContainer>
      </TextHighlightContextProvider>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const queryParams = getSearchQueryForAPI(query)
  const filterOrders = query.filter_order ? query.filter_order.split(',') : []

  const response = await fetchSearch(queryParams, filterOrders)

  if (response.ok && response) {
    return {
      props: {
        query: formatFacetQueryParams(
          Object.keys(response.facets),
          queryParams
        ),
        response
      }
    }
  }

  return { notFound: true }
}

export default Search
