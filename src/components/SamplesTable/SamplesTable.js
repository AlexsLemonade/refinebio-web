import { useMemo, memo } from 'react'
import { DataTable } from 'components/shared/DataTable'
import { AddSampleButton } from './AddSampleButton'

export const SamplesTable = ({ experiments }) => {
  const data = useMemo(() => experiments.results, [])
  // TEMEPORARY
  const columns = useMemo(
    () => [
      {
        Header: 'Add/Remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <AddSampleButton />
      },
      {
        Header: 'Accession Code',
        accessor: 'accession_code'
      },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Sex', accessor: 'sex' },
      { Header: 'Age', accessor: 'age' },
      {
        Header: 'Specimen Part',
        accessor: 'specimen_part'
      },
      {
        Header: 'Platform',
        accessor: 'pretty_platform'
      },
      {
        Header: 'Technology',
        accessor: 'technology'
      },
      {
        Header: 'Manufacturer',
        accessor: 'manufacturer'
      }
    ],
    []
  )

  return <DataTable columns={columns} data={data} />
}

export default memo(SamplesTable)
