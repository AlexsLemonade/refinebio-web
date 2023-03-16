/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { makeURLParams } from 'helpers/makeURLParams'
import { Box, Grid, Spinner } from 'grommet'
import { Button } from 'components/shared/Button'
import { BoxBlock } from 'components/shared/BoxBlock'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerLayerResponsive'
import { Icon } from 'components/shared/Icon'
import { Pagination } from 'components/shared/Pagination'
import { SearchBulkActions, SearchFilterList } from 'components/SearchResults'
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
  //
  const [facets, setFacets] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [selectedSortByOption, setSelectedSortByOption] = useState(
    sortByOptions[0].value
  )
  const [filter, setFilter] = useState({})
  const [toggleFilterList, setToggleFilterList] = useState(false)

  useEffect(() => {
    // TEMPORARY (* for UI demo)
    const formattedParams = makeURLParams(filter)
    const url = `v1/search/?&offset=${
      page * pageSize
    }&limit=${pageSize}&ordering=${selectedSortByOption}${formattedParams}`
    // eslint-disable-next-line no-console
    console.log(url)

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
      // setSearchResults(data)
      // setFacets(data.facets)
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

            <SearchFilterList
              facets={facets}
              filter={filter}
              setFilter={setFilter}
            />
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
          <SearchBulkActions
            pageSize={pageSize}
            pageSizes={pageSizes}
            results={searchResults}
            sortByOptions={sortByOptions}
            selectedSortByOption={selectedSortByOption}
            setPageSize={setPageSize}
            setSelectedSortByOption={setSelectedSortByOption}
          />

          {loading ? (
            <Box align="center" fill justify="center">
              <Spinner
                color="gray-shade-70"
                message={{ start: 'Loading data', end: 'Data loaded' }}
              />
            </Box>
          ) : searchResults?.results?.length ? (
            <Box animation={{ type: 'fadeIn', duration: 300 }}>
              {searchResults.results.map((result) => (
                <SearchCard key={result.id} result={result} />
              ))}
            </Box>
          ) : (
            <Box>No search results</Box>
          )}

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
        </Box>
      </Grid>
    </FixedContainer>
  )
}

export default memo(Search)
