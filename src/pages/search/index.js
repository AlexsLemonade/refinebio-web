/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useSearch } from 'hooks/useSearch'
import { useIntersectObserver } from 'hooks/useIntersectObserver'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { getQueryParam } from 'helpers/search'
import { Box, Grid, Spinner } from 'grommet'
import { Button } from 'components/shared/Button'
import { BoxBlock } from 'components/shared/BoxBlock'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerLayerResponsive'
import { Icon } from 'components/shared/Icon'
import { Pagination } from 'components/shared/Pagination'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchInfoBanner } from 'components/SearchResults/SearchInfoBanner'
import { SearchCard } from 'components/SearchCard'
import {
  MissingResultsAlert,
  NoMatchingResults,
  SearchBulkActions,
  SearchFilterList
} from 'components/SearchResults'
import { options } from 'config'

export const Search = (props) => {
  const { pathname, query } = props
  const router = useRouter()
  const { filter, setFilter, searchTerm, setSearchTerm, getSearchResults } =
    useSearch()
  const { viewport, setResponsive } = useResponsive()
  const endRef = useRef(null)
  const isEndVisible = useIntersectObserver(endRef, {
    rootMargin: '0px',
    threshold: 0.99
  }).isIntersecting
  const sideWidth = '300px'
  const searchBoxWidth = '550px'
  // TEMPORARY (* for UI demo)
  // All the search related states will be moved to the context for search
  const pageSizes = [10, 20, 50]
  const [loading, setLoading] = useState(true)
  const [facets, setFacets] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [sortByOption, setSortByOption] = useState(options.sortby[0].value)
  const [results, setResults] = useState(null)
  const isResults = results && results.results.length > 0
  const [toggleFilterList, setToggleFilterList] = useState(false)
  const [userInput, setUserInput] = useState('')
  const timer = useRef(null)
  const stopTimer = () => clearTimeout(timer.current)
  const getResults = async (params) => {
    const response = await getSearchResults(params)
    setResults(response)
    setFacets(response.facets)
    setLoading(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(userInput)
  }
  const params = {
    limit: pageSize,
    offset: page * pageSize,
    ordering: sortByOption,
    ...filter,
    // the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
    // NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
    // with `num_downloadable_samples__gt: 0`
    ...(searchTerm ? { search: searchTerm } : ''),
    ...(!filter || !filter.empty ? { num_downloadable_samples__gt: 0 } : '')
  }

  useEffect(() => {
    if (query) {
      setFilter(getQueryParam(query))
      setSearchTerm(query.search)
      setUserInput(query.search)
      getResults({ ...params, ...getQueryParam(query) })
    }
  }, [])

  useEffect(() => {
    // TEMPORARY (* for UI demo)
    if (filter) {
      // add the delay to prevent 'Loading initial props cancelled' error on router
      timer.current = window.setTimeout(
        () => router.push({ pathname, query: filter }),
        1000
      )
    }
    return () => stopTimer()
  }, [filter, page, pageSize, sortByOption])

  return (
    <TextHighlightContextProvider match={searchTerm}>
      <FixedContainer pad={{ horizontal: 'large', bottom: 'large' }}>
        <SearchInfoBanner />
        <Grid
          areas={[
            { name: 'top', start: [1, 0], end: [1, 0] },
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
          <BoxBlock
            gridArea="top"
            margin={{
              top: 'medium',
              bottom: setResponsive('medium', 'medium', 'xlarge')
            }}
            width={setResponsive('100%', searchBoxWidth)}
          >
            <SearchBox
              placeholder="Search accessions, pathways, diseases, etc.,"
              btnType="primary"
              size="large"
              value={userInput}
              responsive
              changeHandler={(e) => setUserInput(e.target.value)}
              submitHandler={handleSubmit}
            />
          </BoxBlock>
          <LayerResponsive position="left" show={toggleFilterList} tabletMode>
            <BoxBlock
              animation={isEndVisible ? {} : { type: 'fadeIn' }}
              gridArea="side"
              margin={{ top: 'large' }}
              pad={{
                left: setResponsive('basex7', 'basex7', 'none'),
                right: setResponsive('basex7', 'basex7', 'large'),
                top: setResponsive('large', 'large', 'none'),
                bottom: '200px'
              }}
              width={setResponsive('100vw', '100vw', sideWidth)}
              height={{ max: '100vh' }}
              style={{
                minHeight: '-webkit-fill-available',
                position: isEndVisible ? 'relative' : 'fixed',
                overflowY: 'auto'
              }}
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
              {results && facets && <SearchFilterList facets={facets} />}
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
            {isResults && (
              <SearchBulkActions
                pageSize={pageSize}
                pageSizes={pageSizes}
                results={results}
                sortByOptions={options.sortby}
                selectedSortByOption={sortByOption}
                setPageSize={setPageSize}
                setSelectedSortByOption={setSortByOption}
              />
            )}
            {loading ? (
              <Box
                align="center"
                fill
                justify="center"
                margin={{ top: 'basex15' }}
              >
                <Spinner
                  color="gray-shade-70"
                  message={{ start: 'Loading data', end: 'Data loaded' }}
                />
              </Box>
            ) : isResults ? (
              <Box animation={{ type: 'fadeIn', duration: 300 }}>
                {results.results.map((result) => (
                  <SearchCard key={result.id} result={result} />
                ))}
                {results.results.length < 10 && <MissingResultsAlert />}
              </Box>
            ) : (
              <NoMatchingResults />
            )}
            {isResults && (
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
                />
              </Box>
            )}
          </Box>
        </Grid>
      </FixedContainer>
      <Box ref={endRef} />
    </TextHighlightContextProvider>
  )
}

Search.getInitialProps = async ({ pathname, query }) => {
  const searchQuery = { ...query }
  const props = { pathname, query: searchQuery }

  return {
    ...props
  }
}

export default Search
