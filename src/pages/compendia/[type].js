import { useRouter } from 'next/router'
import { Box, Tab } from 'grommet'
import { CompendiaContextProvider } from 'contexts/CompendiaContext'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import { compendia as CompendiaConfig } from 'config'
import getReadable from 'helpers/getReadable'
import { SignUpBlock } from 'components/shared/SignUpBlock'
import { Tabs } from 'components/shared/Tabs'
import { Hero } from 'components/Compendia/Hero'
import { NormalizedTab } from 'components/Compendia/NormalizedTab'
import { RNASeqTab } from 'components/Compendia/RNASeqTab'

export const Compendia = ({ compendia, type }) => {
  const { setResponsive } = useResponsive()
  const { push } = useRouter()

  const tabConfigs = [
    { tab: 'normalized', Component: NormalizedTab },
    { tab: 'rna-seq', Component: RNASeqTab }
  ]
  const activeIndex = tabConfigs.findIndex(({ tab }) => tab === type)

  return (
    <Box pad={{ top: setResponsive('basex7', 'basex7', 'basex10') }}>
      <Hero />
      <CompendiaContextProvider initialCompendia={compendia} initialType={type}>
        <Tabs activeIndex={activeIndex} text>
          {tabConfigs.map(({ tab, Component }) => (
            <Tab
              key={tab}
              title={getReadable(tab)}
              onClick={() => push(`/compendia/${tab}`)}
            >
              <Component />
            </Tab>
          ))}
        </Tabs>
      </CompendiaContextProvider>
      <SignUpBlock />
    </Box>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { type } = query
  // The routes must be the valid compendia types
  if (!CompendiaConfig.types.includes(type)) {
    return {
      notFound: true
    }
  }

  const compendiaQuery = {
    latest_version: true,
    limit: 1000,
    quant_sf_only: type === 'rna-seq'
  }

  const response = await api.compendia.get(compendiaQuery)

  return {
    props: {
      compendia: response.results,
      type
    }
  }
}

export default Compendia
