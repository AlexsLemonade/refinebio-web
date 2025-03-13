import { useRouter } from 'next/router'
import { Box, Tab } from 'grommet'
import { CompendiaContextProvider } from 'contexts/CompendiaContext'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import { compendia as CompendiaConfig } from 'config'
import getReadable from 'helpers/getReadable'
import { SignUpBlock } from 'components/SignUpBlock'
import { Tabs } from 'components/Tabs'
import { CompendiaHero } from 'components/CompendiaHero'
import { CompendiaNormalizedTab } from 'components/CompendiaNormalizedTab'
import { CompendiaRNASeqTab } from 'components/CompendiaRNASeqTab'

export const Compendia = ({ compendia, type }) => {
  const { setResponsive } = useResponsive()
  const { push } = useRouter()

  const tabConfigs = [
    { type: 'normalized', Component: CompendiaNormalizedTab },
    { type: 'rna-seq', Component: CompendiaRNASeqTab }
  ]
  const activeIndex = tabConfigs.findIndex((config) => config.type === type)

  return (
    <Box pad={{ top: setResponsive('basex7', 'basex7', 'basex10') }}>
      <CompendiaHero />
      <CompendiaContextProvider initialCompendia={compendia} initialType={type}>
        <Tabs activeIndex={activeIndex} text>
          {tabConfigs.map((config) => (
            <Tab
              key={config.type}
              title={getReadable(config.type)}
              onClick={() => push(`/compendia/${config.type}`)}
            >
              <config.Component />
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
  if (!CompendiaConfig.types.includes(type)) return { notFound: true }

  const compendiaQuery = {
    latest_version: true,
    limit: 1000,
    quant_sf_only: type === 'rna-seq'
  }

  const response = await api.compendia.get(compendiaQuery)

  if (response.ok && response.results) {
    return {
      props: {
        compendia: response.results,
        type
      }
    }
  }

  return { notFound: true }
}

export default Compendia
