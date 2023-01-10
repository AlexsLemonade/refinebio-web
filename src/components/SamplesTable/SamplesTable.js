import { useMemo, memo } from 'react'
import { formatString } from 'helpers/formatString'
import { DataTable } from 'components/shared/DataTable'
import { TextNull } from 'components/shared/TextNull'
import { CellAddRemove } from './CellAddRemove'
import { CellMetadataAnnotations } from './CellMetadataAnnotations'
import { CellProcessingInformation } from './CellProcessingInformation'

export const SamplesTable = ({ experiment, samples }) => {
  // the 'totalColumns' value matches the current refine.bio setting
  const totalColumns = experiment ? 4 + experiment.sample_metadata.length : 0
  const pageSizes = [10, 20, 50]
  const data = useMemo(() => samples.results, [])
  const sampleMetadata = experiment.sample_metadata

  // TEMEPORARY
  const columns = useMemo(
    () => [
      {
        Header: 'Add/Remove',
        id: 'add_remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellAddRemove />,
        sticky: 'left',
        minWidth: 110
      },
      {
        id: 'id',
        accessor: 'id',
        isVisible: false
      },
      {
        Header: 'Accession Code',
        accessor: 'accession_code',
        sticky: 'left'
      },
      {
        Header: 'Title',
        accessor: 'title',
        sticky: 'left'
      },
      // map the available columns in the experiment.sample_metadata
      ...sampleMetadata.map((column) => ({
        id: column,
        accessor: column,
        Header: formatString(column),
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ value }) => value || <TextNull text="N/A" />
      })),
      {
        Header: 'Processing Information',
        id: 'processing_information',
        sortable: false,
        width: 200,
        Cell: CellProcessingInformation
      },
      {
        Header: 'Additional Metadata',
        id: 'additional_metadata',
        sortable: false,
        width: 200,
        Cell: CellMetadataAnnotations
      }
    ],
    []
  )

  const defaultColumn = useMemo(
    () => ({ minWidth: 60, width: 160, maxWidth: 450 }),
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      defaultColumn={defaultColumn}
      hiddenColumns={columns
        .filter((column) => column.isVisible === false)
        .map((column) => column.accessor)}
      original={samples}
      pageSizes={pageSizes}
      totalColumns={totalColumns}
    />
  )
}

export default memo(SamplesTable)
