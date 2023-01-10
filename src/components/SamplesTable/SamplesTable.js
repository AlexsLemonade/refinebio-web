import { useMemo, memo } from 'react'
import { DataTable } from 'components/shared/DataTable'
import { CellAddRemove } from './CellAddRemove'
import { CellMetadataAnnotations } from './CellMetadataAnnotations'
import { CellProcessingInformation } from './CellProcessingInformation'

export const SamplesTable = ({ experiment, samples }) => {
  // the 'totalColumns' value matches the current refine.bio setting 
  const totalColumns = experiment ? 4 + experiment.sample_metadata.length : 0
  const pageSizes = [10, 20, 50]
  const data = useMemo(() => samples.results, [])

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
        Header: 'Accession Code',
        accessor: 'accession_code',
        sticky: 'left'
      },
      {
        Header: 'Title',
        accessor: 'title',
        sticky: 'left'
      },
      {
        Header: 'Specimen Part',
        accessor: 'specimen_part'
      },
      {
        Header: 'Platform',
        accessor: 'pretty_platform'
      },
      {
        Header: 'Sex',
        accessor: 'sex'
      },
      {
        Header: 'Processing Information',
        id: 'processing_information',
        sortable: false,
        width: 200,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellProcessingInformation />
      },
      {
        Header: 'Additional Metadata',
        id: 'additional_metadata',
        sortable: false,
        width: 200,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellMetadataAnnotations />
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
      original={samples}
      pageSizes={pageSizes}
      totalColumns={totalColumns}
    />
  )
}

export default memo(SamplesTable)
