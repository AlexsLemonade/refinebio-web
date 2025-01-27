import { Box, Grid, Select } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { useSearchManager } from 'hooks/useSearchManager'
import getReadableOptions from 'helpers/getReadableOptions'
import { PageSizes } from 'components/shared/PageSizes'
import { AddPageToDatasetButton } from './AddPageToDatasetButton'
import { HideNonDownloadableExperiments } from './SearchFilterList'

export const SearchBulkActions = ({ response, query }) => {
  const { results, totalResults } = response
  const { updatePageSize, updateSortBy } = useSearchManager()
  const { getForBreakpoint, setResponsive } = useResponsive()
  const sortByValues = [
    '_score',
    '-num_downloadable_samples',
    'num_downloadable_samples',
    '-source_first_published',
    'source_first_published'
  ]

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
        columns={
          setResponsive(
            ['auto'],
            getForBreakpoint(1100, ['auto', 'auto'], ['auto', 'auto', 'auto'])
          )
          // eslint-disable-next-line no-nested-ternary
        }
        gap={{
          row: 'medium',
          column: 'xsmall'
        }}
      >
        <Box gridArea="page-display" justify="center">
          <Box align="center" direction="row">
            <PageSizes
              textPrepend="Showing"
              textAppended="results"
              pageSizeLabel="Total Samples"
              pageSize={query.limit}
              totalPages={totalResults}
              onPageSizeChange={updatePageSize}
            />
          </Box>
        </Box>
        <Box gridArea="sort-by">
          <Box align="center" direction="row">
            Sort by
            <Box width="208px">
              <Select
                options={getReadableOptions(sortByValues)}
                labelKey="label"
                value={query.ordering}
                valueKey={{ key: 'value', reduce: true }}
                margin={{ horizontal: 'xxsmall' }}
                onChange={({ value: nextValue }) => updateSortBy(nextValue)}
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
              dataToAdd={results}
            />
          </Box>
        </Box>
        <Box gridArea="hide-non-downloadble">
          <HideNonDownloadableExperiments />
        </Box>
      </Grid>
    </Box>
  )
}

export default SearchBulkActions
