import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from 'grommet'
import getReadable from 'helpers/getReadable'
import { Tabs as SharedTabs } from 'components/shared/Tabs'
import { NormalizedTab } from './NormalizedTab'
import { RNASeqTab } from './RNASeqTab'

export const Tabs = () => {
  const {
    isReady,
    pathname,
    query: { type },
    replace
  } = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const handleActive = (nextIndex) => setActiveIndex(nextIndex)
  const tabs = [
    {
      type: 'normalized',
      Component: NormalizedTab
    },
    {
      type: 'rna-seq',
      Component: RNASeqTab
    }
  ]

  useEffect(() => {
    if (!isReady) return

    setActiveIndex(type === 'rna-seq' ? 1 : 0)
  }, [isReady, type])

  const clickHandle = (tabType) => {
    replace({ pathname, query: { type: tabType } }, `/compendia/${tabType}`, {
      shallow: true
    })
  }

  return (
    <SharedTabs activeIndex={activeIndex} text onActive={handleActive}>
      {tabs.map((tab) => (
        <Tab
          key={tab.type}
          title={getReadable(tab.type)}
          onClick={() => clickHandle(tab.type)}
        >
          {/* TEMP: camelCase to prevent sub-comonents from breaking (will update in a later stacked issue) */}
          <tab.Component type={tab.type === 'rna-seq' ? 'rnaSeq' : tab.type} />
        </Tab>
      ))}
    </SharedTabs>
  )
}

export default Tabs
