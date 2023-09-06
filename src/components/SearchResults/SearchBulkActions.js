import { Box, Grid, Select } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { useSearchManager } from 'hooks/useSearchManager'
import { PageSizes } from 'components/shared/PageSizes'
import { options } from 'config'
import { AddPageToDatasetButton } from './AddPageToDatasetButton'
import { NonDownloadableExperiment } from './SearchFilterList'

export const SearchBulkActions = ({
  results,
  pageSize,
  setPageSize,
  sortBy,
  setSortBy
}) => {
  const {
    search: { pageSizes, sortby }
  } = options
  const { updatePageSize, updateSortBy } = useSearchManager()
  const { getForBreakpoint, setResponsive } = useResponsive()

  const handleChageSort = (newOrder) => {
    setSortBy(newOrder)
    updateSortBy(newOrder)
  }

  return (
    <Box pad={{ bottom: 'medium' }}>
      <Grid
        areas={setResponsive(
          [
            {
              name: 'page-display',
              start: [0, 0],
              end: [0, 0]
            },
            {
              name: 'sort-by',
              start: [0, 1],
              end: [0, 1]
            },
            {
              name: 'add-page',
              start: [0, 3],
              end: [0, 3]
            },
            {
              name: 'hide-non-downloadble',
              start: [0, 2],
              end: [0, 2]
            }
          ],
          [
            { name: 'page-display', start: [0, 0], end: [1, 0] },
            {
              name: 'sort-by',
              start: [1, 0],
              end: getForBreakpoint(850, [2, 0], [1, 0])
            },
            {
              name: 'add-page',
              start: getForBreakpoint(850, [1, 1], [2, 0]),
              end: getForBreakpoint(850, [2, 1], [2, 0])
            },
            {
              name: 'hide-non-downloadble',
              start: getForBreakpoint(850, [0, 1], [0, 1]),
              end: getForBreakpoint(850, [0, 1], [2, 1])
            }
          ],
          [
            { name: 'page-display', start: [0, 0], end: [1, 0] },
            {
              name: 'sort-by',
              start: [1, 0],
              end: getForBreakpoint(1100, [2, 0], [1, 0])
            },
            {
              name: 'add-page',
              start: getForBreakpoint(1100, [1, 1], [2, 0]),
              end: getForBreakpoint(1100, [2, 1], [2, 0])
            },
            {
              name: 'hide-non-downloadble',
              start: getForBreakpoint(1100, [0, 1], [0, 1]),
              end: getForBreakpoint(1100, [0, 1], [2, 1])
            }
          ]
        )}
        rows={setResponsive(['auto', 'auto', 'auto', 'auto'], ['auto', 'auto'])}
        columns={setResponsive(
          ['auto'],
          getForBreakpoint(1100, ['auto', 'auto'], ['auto', 'auto', 'auto'])
        )}
        gap={{
          row: 'medium',
          column: 'xsmall'
        }}
        align="center"
      >
        <Box gridArea="page-display" justify="center">
          <Box align="center" direction="row">
            <PageSizes
              textPrepend="Showing"
              textAppended="results"
              pageSizeLabel="Total Samples"
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageSizes={pageSizes}
              totalPages={results.count}
              updatePageSize={updatePageSize}
            />
          </Box>
        </Box>
        <Box gridArea="sort-by">
          <Box align="center" direction="row">
            Sort by
            <Box width="208px">
              <Select
                options={Object.values(sortby)}
                labelKey="label"
                value={sortBy}
                valueKey={{ key: 'value', reduce: true }}
                margin={{ horizontal: 'xxsmall' }}
                onChange={({ value: nextValue }) => handleChageSort(nextValue)}
              />
            </Box>
          </Box>
        </Box>
        <Box gridArea="add-page">
          <Box align={setResponsive('start', 'end')}>
            <AddPageToDatasetButton
              label="Add Page to Dataset"
              secondary
              responsive={setResponsive(true, false)}
              dataToAdd={results.results}
            />
          </Box>
        </Box>
        <Box gridArea="hide-non-downloadble">
          <NonDownloadableExperiment />
        </Box>
      </Grid>
    </Box>
  )
}

export default SearchBulkActions
