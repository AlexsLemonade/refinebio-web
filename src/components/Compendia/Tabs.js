import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from 'grommet'
import { options } from 'config'
import { Tabs as SharedTabs } from 'components/shared/Tabs'
import { NormalizedTab } from './NormalizedTab'
import { RNASeqTab } from './RNASeqTab'

export const Tabs = () => {
  const {
    compendia: { tabs }
  } = options
  const { isReady, pathname, query, replace } = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const handleActive = (nextIndex) => setActiveIndex(nextIndex)

  useEffect(() => {
    if (!isReady) return

    setActiveIndex(query.type === 'rna-seq' ? 1 : 0)
  }, [isReady, query])

  const clickHandle = (tabType) => {
    const tabName = tabType === 'rnaSeq' ? 'rna-seq' : tabType

    replace({ pathname, query: { type: tabType } }, `/compendia/${tabName}`, {
      shallow: true
    })
  }

  return (
    <SharedTabs activeIndex={activeIndex} text onActive={handleActive}>
      {tabs.map((tab) => (
        <Tab
          key={tab.type}
          title={tab.label}
          onClick={() => clickHandle(tab.type)}
        >
          {tab.type === tabs[0].type ? (
            <NormalizedTab type={tab.type} />
          ) : (
            <RNASeqTab type={tab.type} />
          )}
        </Tab>
      ))}
    </SharedTabs>
  )
}

export default Tabs
