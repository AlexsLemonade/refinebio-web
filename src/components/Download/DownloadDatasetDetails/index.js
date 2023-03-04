import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Tabs, Tab } from 'grommet'
import { Row } from 'components/shared/Row'
import { ExperimentView, SpeciesView } from './views'
import { RemoveAllButton } from './RemoveAllButton'

export const DownloadDatasetDetails = ({ dataset, shared = false }) => {
  const { setResponsive } = useResponsive()
  const [activeIndex, setActiveIndex] = useState(0)
  const handleActive = (nextIndex) => setActiveIndex(nextIndex)

  // tab items
  const tabs = [
    {
      label: 'Species View',
      component: <SpeciesView dataset={dataset} shared={shared} />
    },
    {
      label: 'Experiment View',
      component: <ExperimentView dataset={dataset} shared={shared} />
    }
  ]

  return (
    <Box margin={{ top: 'large' }}>
      <Row margin={{ bottom: setResponsive('medium', 'none') }}>
        <Heading
          level={2}
          margin={{ bottom: 'small' }}
          size={setResponsive('h2_xsmall', 'h2_small')}
        >
          Samples
        </Heading>
        {!shared && <RemoveAllButton />}
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

export default DownloadDatasetDetails
