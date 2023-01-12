import { useMemo, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { formatString } from 'helpers/formatString'
import { Anchor } from 'components/shared/Anchor'
import { DataTable } from 'components/shared/DataTable'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'
import { links } from 'config'
import { CellAddRemove } from './CellAddRemove'
import { CellMetadataAnnotations } from './CellMetadataAnnotations'
import { CellProcessingInformation } from './CellProcessingInformation'

export const SamplesTable = ({ experiment, samples }) => {
  const { viewport, setResponsive } = useResponsive()
  const stickyColumns = 3
  const totalColumns = experiment ? 4 + experiment.sample_metadata.length : 0 // same as the current refine.bio
  const pageSizes = [10, 20, 50]
  const data = useMemo(() => samples.results, [])
  const sampleMetadata = experiment.sample_metadata

  // TEMEPORARY
  const columns = useMemo(() => {
    const temp = [
      {
        Header: 'Add/Remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: () => <CellAddRemove />,
        id: 'add_remove',
        maxWidth: 160
      },
      {
        Header: 'Accession Code',
        accessor: 'accession_code',
        maxWidth: 160
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        id: 'id',
        accessor: 'id',
        isVisible: false
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
        width: 180,
        Cell: CellProcessingInformation
      },
      {
        Header: 'Additional Metadata',
        id: 'additional_metadata',
        sortable: false,
        width: 180,
        Cell: CellMetadataAnnotations
      }
    ]
    // columns stick to left only for large(enough screen real estate)
    if (viewport === 'large') {
      for (let i = 0; i <= stickyColumns; i++) {
        temp[i].sticky = 'left'
      }
    }

    return temp
  }, [viewport])

  const defaultColumn = useMemo(
    () => ({ minWidth: 60, width: 160, maxWidth: 260 }),
    []
  )

  return (
    <>
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

      <Row justify="start" margin={{ top: 'small' }}>
        <InlineMessage
          color="info"
          fontSize={setResponsive('small', 'medium')}
          margin={{ right: 'xsmall', bottom: setResponsive('xsmall', 'none') }}
          label="Some fields may be harmonized."
          name="Info"
        />
        <Anchor
          href={links.refinebio_docs_harmonized_metadata}
          label="Learn More"
          rel="noopener noreferrer"
          size={setResponsive('small', 'medium')}
          target="_blank"
        />
      </Row>
    </>
  )
}

export default memo(SamplesTable)
