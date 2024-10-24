import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from 'grommet'
import getReadable from 'helpers/getReadable'
import { Tabs as SharedTabs } from 'components/shared/Tabs'
import { NormalizedTab } from './NormalizedTab'
import { RNASeqTab } from './RNASeqTab'

export const Tabs = ({ type }) => {
  const { pathname, replace } = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const tabConfigs = [
    {
      id: 'normalized',
      Component: NormalizedTab
    },
    {
      id: 'rna-seq',
      Component: RNASeqTab
    }
  ]

  const handleClick = (tabId) => {
    replace({ pathname, query: { type: tabId } }, `/compendia/${tabId}`, {
      shallow: true
    })
  }

  // sets the active tab index based on the current tab
  useEffect(() => {
    setActiveIndex(tabConfigs.findIndex(({ id }) => id === type))
  }, [type])

  return (
    <SharedTabs activeIndex={activeIndex} text>
      {tabConfigs.map(({ id, Component }) => (
        <Tab key={id} title={getReadable(id)} onClick={() => handleClick(id)}>
          {/* TEMP: camelCase to prevent sub-comonents from breaking (will update in a later stacked issue) */}
          <Component type={id === 'rna-seq' ? 'rnaSeq' : id} />
        </Tab>
      ))}
    </SharedTabs>
  )
}

export default Tabs
