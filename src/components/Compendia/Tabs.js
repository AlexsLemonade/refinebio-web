import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from 'grommet'
import { Tabs as SharedTabs } from 'components/shared/Tabs'
import { CompendiaNormalizedTab } from './NormalizedTab'
import { CompendiaRNASeqTab } from './RNASeqTab'

export const Tabs = () => {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [type, setType] = useState('')
  const handleActive = (nextIndex) => setActiveIndex(nextIndex)

  useEffect(() => {
    setType(router.query.type)
    setActiveIndex(type === 'rna-seq' ? 1 : 0)
  }, [router, type])

  const clickHandle = (tabType) => {
    setType(tabType)
    router.replace(
      { pathname: router.pathname, query: { type: tabType } },
      `/compendia/${tabType}`,
      { shallow: true }
    )
  }
  // tab items
  const tabs = [
    {
      type: 'normalized',
      label: 'Normalized Compendia'
    },
    {
      type: 'rna-seq',
      label: 'RNA-seq Sample Compendia'
    }
  ]

  return (
    <SharedTabs activeIndex={activeIndex} text onActive={handleActive}>
      {tabs.map((tab) => (
        <Tab
          key={tab.type}
          title={tab.label}
          onClick={() => clickHandle(tab.type)}
        >
          {tab.type === tabs[0].type ? (
            <CompendiaNormalizedTab type={tab.type} />
          ) : (
            <CompendiaRNASeqTab type={tab.type} />
          )}
        </Tab>
      ))}
    </SharedTabs>
  )
}

export default Tabs
