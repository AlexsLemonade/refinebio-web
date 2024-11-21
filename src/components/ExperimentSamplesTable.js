import { Heading } from 'grommet'
import { SamplesContextProvider } from 'contexts/SamplesContext'
import { useResponsive } from 'hooks/useResponsive'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import {
  SamplesTable,
  SamplesTableAction
} from 'components/shared/SamplesTable'

export const ExperimentSamplesTable = ({ experiment }) => {
  const {
    accession_code: accesionCode,
    num_downloadable_samples: downloadableSamples,
    sample_metadata: sampleMetadata,
    samples
  } = experiment
  const { setResponsive } = useResponsive()

  return (
    <SamplesContextProvider>
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
          <SamplesTableAction
            accessionCode={accesionCode}
            downloadableSamples={downloadableSamples}
          />
        </Column>
      </Row>
      <SamplesTable
        allSamples={getFormattedExperiment(accesionCode, downloadableSamples)}
        sampleAccessionsInExperiment={{
          [accesionCode]: samples.map((sample) => sample.accession_code)
        }}
        queryToAdd={{
          experiment_accession_code: accesionCode
        }}
        sampleMetadataFields={sampleMetadata}
        showOnlyAddedSamples
      />
    </SamplesContextProvider>
  )
}

export default ExperimentSamplesTable
