import { Tab } from 'grommet'
import { Tabs } from 'components/shared/Tabs'

export const CompendiaTabs = () => {
  return (
    <Tabs text>
      <Tab title="Normalized Compendia">Normalized Compendia</Tab>
      <Tab title="RNA-seq Sample Compendia">RNA-seq Sample Compendia</Tab>
    </Tabs>
  )
}
