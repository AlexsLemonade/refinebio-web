import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Grid } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { LayerResponsive } from 'components/shared/LayerLayerResponsive'
import { Icon } from 'components/shared/Icon'
import { SearchBulkActions } from 'components/SearchBulkActions'
import { SearchCard } from 'components/SearchCard'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchFilterList } from 'components/SearchFilterList'
import data from 'api/mockDataSearchResult'

export const Search = () => {
  const { viewport, setResponsive } = useResponsive()
  const [toggleFilterList, setToggleFilterList] = useState(false)
  const sideWidth = '250px'
  const searchBoxWidth = '550px'

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
        <Box
          gridArea="top"
          margin={{
            top: 'xlarge',
            bottom: setResponsive('medium', 'medium', 'xlarge')
          }}
          style={{ display: 'block' }}
          width={setResponsive('100%', searchBoxWidth)}
        >
          <SearchBox
            placeholder="Search accessions, pathways, diseases, etc.,"
            btnType="primary"
            size="large"
            responsive
          />
        </Box>
        <LayerResponsive position="left" show={toggleFilterList} tabletMode>
          <Box
            background="white"
            gridArea="side"
            pad={{
              horizontal: setResponsive('basex7', 'basex7', 'none'),
              vertical: setResponsive('large', 'large', 'none')
            }}
            width={setResponsive('100vw', '100vw', sideWidth)}
            height={setResponsive('100vh', '100vh', 'auto')}
            style={{
              display: 'block',
              overflowY: setResponsive('scroll', 'scroll', 'auto'),
              minHeight: '-webkit-fill-available'
            }}
          >
            {viewport !== 'large' && (
              <Box align="end" margin={{ bottom: 'small' }}>
                <Box
                  aria-label="Close Filters"
                  role="button"
                  width="max-content"
                  onClick={() => setToggleFilterList(false)}
                >
                  <Icon name="Close" size="large" />
                </Box>
              </Box>
            )}
            <SearchFilterList facets={data.facets} />
          </Box>
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
          <SearchBulkActions results={data} />

          {data.results.map((result) => (
            <SearchCard key={result.id} result={result} />
          ))}
        </Box>
      </Grid>
    </FixedContainer>
  )
}

export default Search
