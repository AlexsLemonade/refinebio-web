import { useState } from 'react'
import { Box, Heading, Tabs, Tab } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/shared/Row'
import { ExperimentView } from './ExperimentView'
import { SpeciesView } from './SpeciesView'
import { RemoveAllButton } from './RemoveAllButton'

export const DatasetDetails = ({ dataset, isImmutable }) => {
  const { setResponsive } = useResponsive()
  const [activeIndex, setActiveIndex] = useState(0)
  const handleActive = (nextIndex) => setActiveIndex(nextIndex)

  // tab items
  const tabs = [
    {
      label: 'Species View',
      component: <SpeciesView dataset={dataset} isImmutable={isImmutable} />
    },
    {
      label: 'Experiment View',
      component: <ExperimentView dataset={dataset} isImmutable={isImmutable} />
    }
  ]

  return (
    <Box margin={{ top: 'large' }}>
      <Row margin={{ bottom: setResponsive('medium', 'none') }}>
        <Heading level={2} margin={{ bottom: 'small' }}>
          Samples
        </Heading>
        {!isImmutable && <RemoveAllButton />}
      </Row>
      <Box margin={{ bottom: 'medium' }}>
        <Tabs activeIndex={activeIndex} justify="start" onActive={handleActive}>
          {tabs.map((tab) => (
            <Tab key={tab.label} title={tab.label}>
              <Box pad={{ top: 'small' }}>{tab.component}</Box>
            </Tab>
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}

export default DatasetDetails
