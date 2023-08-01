import { SampleDebugProvider } from 'contexts/SampleDebugContext'
import { Accordion, AccordionPanel } from 'components/shared/Accordion'
import { Row } from 'components/shared/Row'
import { ComputedFiles, JobInfo, OriginalFiles } from './sections'

export const SampleDebug = ({ accessionCode }) => {
  return (
    <SampleDebugProvider accessionCode={accessionCode}>
      <Accordion>
        <AccordionPanel
          duration="1s"
          title="Debug Information"
          maxHeight="500vh"
        >
          <Row pad={{ top: 'xsmall', bottom: 'large' }}>
            <OriginalFiles />
            <ComputedFiles />
          </Row>
          <JobInfo />
        </AccordionPanel>
      </Accordion>
    </SampleDebugProvider>
  )
}

export default SampleDebug
