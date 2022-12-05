import { Tab } from 'grommet'
import { Tabs } from 'components/shared/Tabs'
import { CompendiaNormalizedTab } from './CompendiaNormalizedTab'

export const CompendiaTabs = () => {
  return (
    <Tabs text>
      <Tab title="Normalized Compendia">
        <CompendiaNormalizedTab />
      </Tab>
      <Tab title="RNA-seq Sample Compendia">RNA-seq Sample Compendia</Tab>
    </Tabs>
  )
}
