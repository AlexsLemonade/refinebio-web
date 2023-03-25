/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState, memo } from 'react'
import { useRouter } from 'next/router'
import { useFilter } from 'hooks/useFilter'
import { useResponsive } from 'hooks/useResponsive'
import { getQueryParam } from 'helpers/search'
import { Box, Grid, Spinner } from 'grommet'
import { Button } from 'components/shared/Button'
import { BoxBlock } from 'components/shared/BoxBlock'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerLayerResponsive'
import { Icon } from 'components/shared/Icon'
import { Pagination } from 'components/shared/Pagination'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchCard } from 'components/SearchCard'
import {
  MissingResultsAlert,
  NoMatchingResults,
  SearchBulkActions,
  SearchFilterList
} from 'components/SearchResults'
import { options } from 'config'
import { api } from 'api'

export const getServerSideProps = ({ query }) => {
  return { props: { query } }
}

export const Search = ({ query }) => {
  const router = useRouter()
  const { filter, setFilter } = useFilter()
  const { viewport, setResponsive } = useResponsive()
  const sideWidth = '250px'
  const searchBoxWidth = '550px'
  const pageSizes = [10, 20, 50]
  // TEMPORARY
  const timer = useRef(null)
  const stopTimer = () => clearTimeout(timer.current)
  const [loading, setLoading] = useState(false)
  const [facets, setFacets] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [searchResults, setSearchResults] = useState(null)
  const [sortByOption, setSortByOption] = useState(options.sortby[0].value)
  const [toggleFilterList, setToggleFilterList] = useState(false)
  const isSearchResults = searchResults && searchResults.results.length > 0

  useEffect(() => {
    if (query) {
      setFilter(getQueryParam(query))
    }
  }, [])

  useEffect(() => {
    // TEMPORARY (* for UI demo)
    if (filter) {
      // add the timer to prevvent 'Loading initial props cancelled' error on router
      timer.current = window.setTimeout(() => {
        router.push({ pathname: '/search', query: filter })
      }, 2000)
    }

    const params = {
      limit: pageSize,
      offset: page * pageSize,
      ordering: sortByOption,
      ...filter,
      // the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
      // NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
      // with `num_downloadable_samples__gt: 0`
      ...(!filter || !filter.empty ? { num_downloadable_samples__gt: 0 } : {})
    }

    const getSearchResults = async () => {
      setLoading(true)
      const result = await api.searchResults.get(params)
      setSearchResults(result)
      setFacets(result.facets)
      setLoading(false)
    }

    getSearchResults()

    return () => stopTimer()
  }, [filter, page, pageSize, sortByOption])

  return (
    <FixedContainer pad="large">
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
          column: setResponsive('none', 'none', '5%')
        }}
      >
        <BoxBlock
          gridArea="top"
          margin={{
            top: 'xlarge',
            bottom: setResponsive('medium', 'medium', 'xlarge')
          }}
          width={setResponsive('100%', searchBoxWidth)}
        >
          <SearchBox
            placeholder="Search accessions, pathways, diseases, etc.,"
            btnType="primary"
            size="large"
            responsive
          />
        </BoxBlock>
        <LayerResponsive position="left" show={toggleFilterList} tabletMode>
          <BoxBlock
            background="white"
            gridArea="side"
            pad={{
              horizontal: setResponsive('basex7', 'basex7', 'none'),
              vertical: setResponsive('large', 'large', 'none')
            }}
            width={setResponsive('100vw', '100vw', sideWidth)}
            height={setResponsive('100vh', '100vh', 'auto')}
            style={{
              overflowY: setResponsive('scroll', 'scroll', 'auto'),
              minHeight: '-webkit-fill-available'
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
            {searchResults && facets && (
              <SearchFilterList
                facets={facets}
                filter={filter}
                setFilter={setFilter}
              />
            )}
          </BoxBlock>
        </LayerResponsive>
        <Box gridArea="main" height={{ min: '50%' }}>
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
          {isSearchResults && (
            <SearchBulkActions
              pageSize={pageSize}
              pageSizes={pageSizes}
              results={searchResults}
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
          ) : isSearchResults ? (
            <Box animation={{ type: 'fadeIn', duration: 300 }}>
              {searchResults.results.map((result) => (
                <SearchCard key={result.id} result={result} />
              ))}

              {searchResults.results.length < 10 && <MissingResultsAlert />}
            </Box>
          ) : (
            <NoMatchingResults />
          )}
          {isSearchResults && (
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
                totalPages={searchResults.count}
              />
            </Box>
          )}
        </Box>
      </Grid>
    </FixedContainer>
  )
}

export default memo(Search)
