/* eslint-disable no-nested-ternary */
import { memo, useEffect, useMemo, useState } from 'react'
import { Box, Spinner, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { useSamplesTableManager } from 'hooks/useSamplesTableManager'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import formatString from 'helpers/formatString'
import { Anchor } from 'components/shared/Anchor'
import { BoxBlock } from 'components/shared/BoxBlock'
import { Button } from 'components/shared/Button'
import { DataTable, ExpandTableButton } from 'components/shared/DataTable'
import { FilterTextInput } from 'components/shared/FilterTextInput'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Overlay } from 'components/shared/Ovevrlay'
import { PageSizes } from 'components/shared/PageSizes'
import { Pagination } from 'components/shared/Pagination'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'
import { links, options } from 'config'
import { SamplesTableEmpty } from './SamplesTableEmpty'
import { AccessionCodeCell } from './AccessionCodeCell'
import { AddRemoveCell } from './AddRemoveCell'
import { AdditionalMetadataCell } from './AdditionalMetadataCell'
import { ProcessingInformationCell } from './ProcessingInformationCell'
import { SampleMetadataCell } from './SampleMetadataCell'
import { ShowOnlyAddedSamplesFilter } from './ShowOnlyAddedSamplesFilter'
import { TitleCell } from './TitleCell'

export const SamplesTable = ({
  sampleAccessionsInExperiment,
  queryToAdd,
  sampleMetadataFields,
  allSamples,
  isImmutable = false,
  modalView = false,
  showOnlyAddedSamples = false
}) => {
  const {
    samplesTable: { pageSizes }
  } = options
  const {
    config: { defaultColumn, minColumns },
    hasError,
    hasSamples,
    loading,
    samplesTable,
    totalPages,
    tableData,
    getSamplesTableData,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateDatasetId,
    updateSortBy
  } = useSamplesTableManager(queryToAdd)
  const { viewport, setResponsive } = useResponsive()
  const [tableExpanded, setTableExpanded] = useState(false)
  const tableHeight = tableExpanded ? '75vh' : '800px' // required for the table height on expanded view
  const data = useMemo(() => tableData.results, [tableData])
  const columns = useMemo(() => {
    const temp = [
      {
        Header: 'Add/Remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row: { original: sample } }) => (
          <AddRemoveCell
            experimentAccessionCodes={Object.keys(
              sampleAccessionsInExperiment
            ).filter((accession) =>
              sampleAccessionsInExperiment[accession].includes(
                sample.accession_code
              )
            )}
            sample={sample}
          />
        ),
        disableSortBy: true,
        id: 'add_remove',
        width: 200,
        maxWidth: 200
      },
      {
        Header: 'Accession Code',
        accessor: 'accession_code',
        Cell: AccessionCodeCell,
        maxWidth: 160
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: TitleCell
      },
      {
        id: 'id',
        accessor: 'id',
        isVisible: false
      },
      // maps the available columns in the experiment.sample_metadata
      ...sampleMetadataFields.map((column) => ({
        id: column,
        accessor: column,
        Header: formatString(column),
        Cell: SampleMetadataCell
      })),
      {
        Header: 'Processing Information',
        disableSortBy: true,
        id: 'processing_information',
        width: 180,
        Cell: ProcessingInformationCell
      },
      {
        Header: 'Additional Metadata',
        disableSortBy: true,
        id: 'additional_metadata',
        width: 180,
        Cell: AdditionalMetadataCell
      }
    ]
    // makes columns stick to left only for 'large' (enough screen real estate)
    if (viewport === 'large') {
      let stickyColumns = 3
      let i = 0
      // removes the add/remove button if the dataset is immutable
      if (isImmutable) {
        temp.shift()
        stickyColumns = 2
      }
      for (i; i <= stickyColumns; i++) {
        temp[i].sticky = 'left'
      }
    }

    return temp
  }, [isImmutable, viewport])
  const totalColumns =
    tableData && sampleMetadataFields ? columns.length - 2 : 0 // excludes add/remove and hidden cells

  useEffect(() => {
    getSamplesTableData()
  }, [])

  return (
    <>
      {tableExpanded && <Overlay duration={0} toggle={tableExpanded} />}
      <Box
        animation={tableExpanded ? { type: 'zoomIn', duration: 250 } : {}}
        background="white"
        height={tableExpanded ? '100vh' : '100%'}
        width={tableExpanded ? '100vw' : '100%'}
        style={{
          position: tableExpanded ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: tableExpanded ? 10 : 'inherit'
        }}
      >
        <Row
          margin={{ bottom: 'small' }}
          pad={{
            top: tableExpanded ? 'large' : 'none',
            horizontal: tableExpanded ? 'basex6' : 'none'
          }}
        >
          <Box
            align={setResponsive('start', 'start', 'center')}
            direction={setResponsive('column', 'column', 'row')}
            margin={{ bottom: setResponsive('medium', 'none') }}
          >
            <PageSizes
              pageSize={samplesTable.pageSize}
              pageSizes={pageSizes}
              totalPages={totalPages}
              setPageSize={updatePageSize}
            />
            <Box
              margin={{
                left: setResponsive('none', 'none', 'medium'),
                top: setResponsive('small', 'xsmall', 'none')
              }}
            >
              {showOnlyAddedSamples && (
                <ShowOnlyAddedSamplesFilter
                  data={allSamples}
                  queryToAdd={queryToAdd}
                  showOnlyAddedSamples
                  updateDatasetId={updateDatasetId}
                />
              )}
            </Box>
          </Box>
          <Box direction="row">
            <Box
              direction="row"
              justify="start"
              align={setResponsive('start', 'center')}
            >
              <FilterTextInput
                filter={samplesTable.filterBy}
                setFilter={updateFilterBy}
                placeholder="Filter samples"
              />
            </Box>
            {!modalView &&
              viewport === 'large' &&
              totalColumns > minColumns && (
                <ExpandTableButton
                  tableExpanded={tableExpanded}
                  setTableExpanded={setTableExpanded}
                />
              )}
          </Box>
        </Row>
        <BoxBlock>
          <TextHighlightContextProvider match={samplesTable.filterBy}>
            <DataTable
              columns={columns}
              data={data || []}
              defaultColumn={defaultColumn}
              hasTableData={hasSamples}
              hiddenColumns={columns
                .filter((column) => column.isVisible === false)
                .map((column) => column.accessor)}
              loading={loading}
              manualPagination
              tableHeight={tableHeight}
              tableExpanded={tableExpanded}
              updateSortBy={updateSortBy}
            />
            {!hasSamples && samplesTable.filterBy && (
              <SamplesTableEmpty>
                <TextNull
                  text={
                    <>
                      No rows found matching
                      <Text
                        color="black"
                        style={{ fontStyle: 'normal' }}
                        margin={{ left: 'xsmall' }}
                      >
                        <strong>"{samplesTable.filterBy}"</strong>
                      </Text>
                    </>
                  }
                />
              </SamplesTableEmpty>
            )}
          </TextHighlightContextProvider>
          {loading ? (
            <SamplesTableEmpty background="rgbaLight7">
              <Spinner
                color="gray-shade-70"
                message={{
                  start: 'Loading data',
                  end: 'Data loaded'
                }}
              />
            </SamplesTableEmpty>
          ) : (
            hasError && (
              <SamplesTableEmpty background="rgbaLight7">
                <Box direction="row" gap="xxsmall">
                  <Text color="error">
                    Temporarily under heavy traffic load. Please
                  </Text>
                  <Button
                    label="try again"
                    link
                    linkColor="error"
                    linkFontSize="medium"
                    onClick={getSamplesTableData}
                    className="color-error"
                  />
                  <Text color="error">later.</Text>
                </Box>
              </SamplesTableEmpty>
            )
          )}
        </BoxBlock>
        {hasSamples && (
          <Box>
            <Box
              direction={setResponsive('column', 'row')}
              justify="start"
              margin={{ top: 'small' }}
            >
              <InlineMessage
                label="Some fields may be harmonized."
                fontSize="medium"
                margin={{
                  left: tableExpanded ? 'basex6' : 'none',
                  right: 'xsmall',
                  bottom: setResponsive('xsmall', 'none')
                }}
              />
              <Anchor
                href={links.refinebio_docs_harmonized_metadata}
                label="Learn More"
                rel="noopener noreferrer"
              />
            </Box>
            <Box
              align="center"
              direction="row"
              justify="center"
              margin={{ top: 'medium' }}
            >
              <Pagination
                page={samplesTable.page}
                pageSize={samplesTable.pageSize}
                reset={samplesTable.reset}
                totalPages={totalPages}
                setPage={updatePage}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default memo(SamplesTable)
