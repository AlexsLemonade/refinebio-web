import { useMemo, memo } from 'react'
import { DataTable } from 'components/shared/DataTable'
import { CellAddRemove } from './CellAddRemove'
import { CellMetadataAnnotations } from './CellMetadataAnnotations'
import { CellProcessingInformation } from './CellProcessingInformation'

export const SamplesTable = ({ experiment }) => {
  const pageSizes = [10, 20, 50]
  const data = useMemo(() => experiment.results, [])
  // TEMEPORARY
  const columns = useMemo(
    () => [
      {
        Header: 'Add/Remove',
        id: 'add_remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellAddRemove />,
        sticky: 'left',
        width: 190
      },
      {
        Header: 'Accession Code',
        accessor: 'accession_code',
        sticky: 'left',
        minWidth: 160,
        width: 175
      },
      { Header: 'Title', accessor: 'title', sticky: 'left', minWidth: 190 },
      // { Header: 'Sex', accessor: 'sex' },
      // { Header: 'Age', accessor: 'age' },
      {
        Header: 'Specimen Part',
        accessor: 'specimen_part',
        minWidth: 160
      },
      {
        Header: 'Platform',
        accessor: 'pretty_platform'
      },
      {
        Header: 'Processing Information',
        id: 'processing_information',
        sortable: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellProcessingInformation />,
        width: 200
      },
      {
        Header: 'Additional Metadata',
        id: 'additional_metadata',
        sortable: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellMetadataAnnotations />,
        width: 200
      }
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      fetchedData={experiment}
      pageSizes={pageSizes}
    />
  )
}

export default memo(SamplesTable)
