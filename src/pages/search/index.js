/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Grid, Spinner } from 'grommet'
import { Button } from 'components/shared/Button'
import { BoxBlock } from 'components/shared/BoxBlock'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerLayerResponsive'
import { Icon } from 'components/shared/Icon'
import { Pagination } from 'components/shared/Pagination'
import {
  NoMatchingResults,
  SearchBulkActions,
  SearchFilterList
} from 'components/SearchResults'
import { SearchCard } from 'components/SearchCard'
import { SearchBox } from 'components/shared/SearchBox'
import { api } from 'api'

export const Search = () => {
  const { viewport, setResponsive } = useResponsive()
  const sideWidth = '250px'
  const searchBoxWidth = '550px'
  const pageSizes = [10, 20, 50]
  const sortByOptions = [
    {
      label: 'Best Match',
      value: '_score'
    },
    {
      label: 'Most No. of samples',
      value: '-num_downloadable_samples'
    },
    {
      label: 'Least No. of samples',
      value: 'num_downloadable_samples'
    },
    {
      label: 'Newest Experiment',
      value: '-source_first_published'
    },
    {
      label: 'Oldest Experiment',
      value: 'source_first_published'
    }
  ]

  const [loading, setLoading] = useState(false)
  const [facets, setFacets] = useState([])
  const [filter, setFilter] = useState({})
  const [checkedFilter, setCheckedFilter] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [searchResults, setSearchResults] = useState(null)
  const [selectedSortByOption, setSelectedSortByOption] = useState(
    sortByOptions[0].value
  )
  const [toggleFilterList, setToggleFilterList] = useState(false)

  const isSearchResults = searchResults && searchResults.results.length > 0

  const handleClearAll = () => {
    setFilter({})
    setCheckedFilter([])
  }

  useEffect(() => {
    // TEMPORARY (* for UI demo)
    const params = {
      limit: pageSize,
      offset: page * pageSize,
      ordering: selectedSortByOption,
      ...filter,
      num_downloadable_samples__gt: 0
    }

    const getSearchResults = async () => {
      setLoading(true)
      const result = await api.searchResults.get(params)
      setSearchResults(result)
      setFacets(result.facets)
      setLoading(false)
    }

    getSearchResults()
  }, [filter, page, pageSize, selectedSortByOption])

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
                checkedFilter={checkedFilter}
                facets={facets}
                filter={filter}
                setCheckedFilter={setCheckedFilter}
                setFilter={setFilter}
                handleClearAll={handleClearAll}
              />
            )}
          </BoxBlock>
        </LayerResponsive>
        <Box gridArea="main">
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
              sortByOptions={sortByOptions}
              selectedSortByOption={selectedSortByOption}
              setPageSize={setPageSize}
              setSelectedSortByOption={setSelectedSortByOption}
            />
          )}

          {loading ? (
            <Box align="center" fill justify="center" height="10000px">
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
            </Box>
          ) : (
            <NoMatchingResults handleClearFilter={handleClearAll} />
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
