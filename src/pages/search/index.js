/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useSearch } from 'hooks/useSearch'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { getFilterParam } from 'helpers/search'
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
import { api } from 'api'

export const Search = (props) => {
  const { query, response: newResponse } = props
  const {
    page,
    setPage,
    pageSize,
    pushSearchTerm,
    setFilter,
    searchTerm,
    setSearchTerm,
    results,
    setResults
  } = useSearch(newResponse)

  const { viewport, setResponsive } = useResponsive()
  const sideWidth = '300px'
  const searchBoxWidth = '550px'
  // TEMPORARY (* for UI demo)
  const [loading, setLoading] = useState(true)
  const [facets, setFacets] = useState([])
  const isResults = results && results.results?.length > 0
  const [toggleFilterList, setToggleFilterList] = useState(false)
  const [userInput, setUserInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(userInput)
    pushSearchTerm(userInput)
  }

  useEffect(() => {
    if (props) {
      setFilter(getFilterParam(query))
      setSearchTerm(query.search)
      setUserInput(query.search)
      setResults(newResponse)
      setFacets(newResponse.facets)
      setLoading(false)
    }
  }, [])

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
              gridArea="side"
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
            {isResults && <SearchBulkActions />}
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
    </TextHighlightContextProvider>
  )
}

Search.getInitialProps = async ({ pathname, query }) => {
  const searchQuery = {
    ...query,
    limit: query.limit || 10,
    offset: query.offset || 0,
    ordering: query.ordering || '_score',
    num_downloadable_samples__gt: query.empty ? '' : 0
  }

  const props = { pathname, query: searchQuery }
  const response = await api.search.get(searchQuery)

  return {
    ...props,
    response
  }
}

export default Search
