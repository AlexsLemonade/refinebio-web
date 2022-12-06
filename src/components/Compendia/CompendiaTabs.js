import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from 'grommet'
import { Tabs } from 'components/shared/Tabs'
import { CompendiaNormalizedTab } from './CompendiaNormalizedTab'
import { CompendiaRNASeqTab } from './CompendiaRNASeqTab'

export const CompendiaTabs = () => {
  const router = useRouter()
  const [type, setType] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const handleActive = (nextIndex) => setActiveIndex(nextIndex)

  useEffect(() => {
    setType(router.query.type)
    setActiveIndex(type === 'rna-seq' ? 1 : 0)
  }, [router, type])

  const clickHandle = (tabType) => {
    setType(tabType, router)
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
    <Tabs activeIndex={activeIndex} text onActive={handleActive}>
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
    </Tabs>
  )
}

export default CompendiaTabs
