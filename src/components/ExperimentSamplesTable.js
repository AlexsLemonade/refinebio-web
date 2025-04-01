import { Heading } from 'grommet'
import { SamplesContextProvider } from 'contexts/SamplesContext'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/Column'
import { Row } from 'components/Row'
import { SamplesTable } from 'components/SamplesTable'
import { SamplesTableAction } from 'components/SamplesTableAction'

export const ExperimentSamplesTable = ({ experiment }) => {
  const { setResponsive } = useResponsive()

  return (
    <SamplesContextProvider
      query={{
        experiment_accession_code: experiment.accession_code
      }}
    >
      <Row margin={{ bottom: 'medium' }}>
        <Column>
          <Heading
            level={2}
            margin={{ bottom: setResponsive('small', 'none') }}
          >
            Samples
          </Heading>
        </Column>
        <Column>
          <SamplesTableAction experiment={experiment} />
        </Column>
      </Row>
      <SamplesTable experiment={experiment} showMyDatasetFilter />
    </SamplesContextProvider>
  )
}

export default ExperimentSamplesTable
