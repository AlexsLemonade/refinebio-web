import { Tab } from 'grommet'
import { Tabs } from 'components/shared/Tabs'
import { CompendiaNormalizedTab } from './CompendiaNormalizedTab'
import { CompendiaRNASeqTab } from './CompendiaRNASeqTab'

export const CompendiaTabs = () => {
  const tabs = ['normalized', 'rna-seq']
  const isNormalized = (tab) => tab === 'normalized'

  return (
    <Tabs text>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          title={
            isNormalized(tab)
              ? 'Normalized Compendia'
              : 'RNA-seq Sample Compendia'
          }
        >
          {isNormalized(tab) ? (
            <CompendiaNormalizedTab type={tab} />
          ) : (
            <CompendiaRNASeqTab type={tab} />
          )}
        </Tab>
      ))}
    </Tabs>
  )
}

export default CompendiaTabs
