import { memo, useMemo, useState } from 'react'
import { Box, Spinner, Text } from 'grommet'
import { useAsyncDebounce } from 'react-table'
import { useSamplesContext } from 'hooks/useSamplesContext'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import formatString from 'helpers/formatString'
import getPageNumber from 'helpers/getPageNumber'
import { Anchor } from 'components/Anchor'
import { BoxBlock } from 'components/BoxBlock'
import { DataTable, ExpandTableButton } from 'components/DataTable'
import { InlineMessage } from 'components/InlineMessage'
import { LabelTextInput } from 'components/LabelTextInput'
import { Overlay } from 'components/Ovevrlay'
import { PageSizes } from 'components/PageSizes'
import { Pagination } from 'components/Pagination'
import { Row } from 'components/Row'
import { TextNull } from 'components/TextNull'
import { links } from 'config'
import { SamplesTableEmpty } from './SamplesTableEmpty'
import { SamplesTableError } from './SamplesTableError'
import { AccessionCodeCell } from './AccessionCodeCell'
import { AddRemoveCell } from './AddRemoveCell'
import { AdditionalMetadataCell } from './AdditionalMetadataCell'
import { ProcessingInformationCell } from './ProcessingInformationCell'
import { SampleMetadataCell } from './SampleMetadataCell'
import { ShowOnlyAddedSamplesFilter } from './ShowOnlyAddedSamplesFilter'
import { TitleCell } from './TitleCell'

export const SamplesTable = ({
  experiment, // for the experiment page
  dataset, // for dataset and download pages
  isImmutable = false,
  modalView = false,
  showMyDatasetFilter = false // sets visibility of ShowOnlyAddedSamplesFilter
}) => {
  const {
    loading,
    hasError,
    samples,
    samplesQuery,
    hasSamples,
    totalSamples,
    getSamplesMetadata,
    getExperimentAccessionCodes,
    refreshSamples,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateSortBy
  } = useSamplesContext()
  const { viewport, setResponsive } = useResponsive()
  const [tableExpanded, setTableExpanded] = useState(false)

  // for react-table
  const defaultColumn = useMemo(
    () => ({ minWidth: 60, width: 160, maxWidth: 250 }),
    []
  )
  const data = useMemo(() => samples, [samples])
  const columns = useMemo(() => {
    if (!samples.length) return []

    const experimentAccessionCodes = getExperimentAccessionCodes(dataset)
    const samplesMetadata = getSamplesMetadata()

    const temp = [
      {
        Header: 'Add/Remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row: { original: sample } }) => (
          <AddRemoveCell
            experimentAccessionCodes={experimentAccessionCodes}
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
      ...samplesMetadata.map((column) => ({
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
      // removes AddRemoveCell if the dataset is immutable
      if (isImmutable) {
        temp.shift()
        stickyColumns = 2
      }
      for (i; i <= stickyColumns; i++) {
        temp[i].sticky = 'left'
      }
    }

    return temp
  }, [isImmutable, viewport, samples])

  // For the filter text input field
  const debounceInput = useAsyncDebounce((newInput) => {
    updateFilterBy(newInput || '')
  }, 500)

  const isExpandableColumns =
    columns.filter(
      (column) => column.Header !== 'Add/Remove' && column.isVisible !== false
    ).length > 5 // We ignore AddRemoveCell and hidden columns
  const showExpandTableButton =
    !modalView && viewport === 'large' && isExpandableColumns
  const tableHeight = tableExpanded ? '75vh' : '800px' // toggles the table height on expanded view

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
              pageSize={samplesQuery.limit}
              totalPages={totalSamples}
              onPageSizeChange={updatePageSize}
            />
            <Box
              margin={{
                left: setResponsive('none', 'none', 'medium'),
                top: setResponsive('small', 'xsmall', 'none')
              }}
            >
              {showMyDatasetFilter && (
                <ShowOnlyAddedSamplesFilter experiment={experiment} />
              )}
            </Box>
          </Box>
          <Box direction="row">
            <Box
              direction="row"
              justify="start"
              align={setResponsive('start', 'center')}
            >
              <LabelTextInput
                filter={samplesQuery.filter_by}
                placeholder="Filter samples"
                onChange={debounceInput}
              />
            </Box>
            {showExpandTableButton && (
              <ExpandTableButton
                tableExpanded={tableExpanded}
                setTableExpanded={setTableExpanded}
              />
            )}
          </Box>
        </Row>
        <BoxBlock>
          <TextHighlightContextProvider match={samplesQuery.filter_by}>
            <DataTable
              columns={columns}
              data={data || []}
              defaultColumn={defaultColumn}
              hasTableData={hasSamples}
              hiddenColumns={columns
                .filter((column) => column.isVisible === false)
                .map((column) => column.accessor)}
              manualPagination
              tableHeight={tableHeight}
              tableExpanded={tableExpanded}
              onSortByChange={updateSortBy}
            />
            {!hasSamples && samplesQuery.filter_by && (
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
                        <strong>"{samplesQuery.filter_by}"</strong>
                      </Text>
                    </>
                  }
                />
              </SamplesTableEmpty>
            )}
          </TextHighlightContextProvider>
          {loading && (
            <SamplesTableEmpty background="rgbaLight7">
              <Spinner
                color="gray-shade-70"
                message={{
                  start: 'Loading data',
                  end: 'Data loaded'
                }}
              />
            </SamplesTableEmpty>
          )}
          {hasError && <SamplesTableError onClick={refreshSamples} />}
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
                page={getPageNumber(samplesQuery.offset, samplesQuery.limit)}
                pageSize={samplesQuery.limit}
                totalPages={totalSamples}
                onPageChange={updatePage}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default memo(SamplesTable)
