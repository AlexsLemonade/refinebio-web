import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Grid, Select, Text } from 'grommet'
import { Button } from 'components/shared/Button'

export const SearchBulkActions = ({ results }) => {
  const { getForBreakpoint, setResponsive } = useResponsive()
  const { count: totalResults } = results
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
  const [selectedSortByOption, setSelectedSortByOption] = useState(
    sortByOptions[0].value
  )

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
        <Box gridArea="page-display">
          <Box align="center" direction="row">
            Showing
            <Box width="84px">
              <Select
                defaultValue={pageSizes[0]}
                options={pageSizes}
                margin={{ horizontal: 'xxsmall' }}
              />
            </Box>
            <Text>of {totalResults.toLocaleString()} results</Text>
          </Box>
        </Box>
        <Box gridArea="sort-by">
          <Box align="center" direction="row">
            Sort by
            <Box width="208px">
              <Select
                options={Object.values(sortByOptions)}
                labelKey="label"
                value={selectedSortByOption}
                valueKey={{ key: 'value', reduce: true }}
                margin={{ horizontal: 'xxsmall' }}
                onChange={({ value: nextValue }) =>
                  setSelectedSortByOption(nextValue)
                }
              />
            </Box>
          </Box>
        </Box>
        <Box gridArea="add-page">
          <Box align={setResponsive('start', 'end')}>
            <Button
              label="Add Page to Dataset"
              secondary
              responsive={setResponsive(true, false)}
            />
          </Box>
        </Box>
        <Box gridArea="hide-non-downloadble">
          <CheckBox label="Hide non-downloadable experiments" checked />
        </Box>
      </Grid>
    </Box>
  )
}

export default SearchBulkActions
