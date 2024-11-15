import { useRouter } from 'next/router'
import { Box, Tab } from 'grommet'
import { useCompendiaContext } from 'hooks/useCompendiaContext'
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
  // initializes the compendia contexts
  useCompendiaContext(compendia, type)

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
  // sets the active tab index based on the selected type
  const activeIndex = tabConfigs.findIndex(({ id }) => id === type)

  return (
    <Box pad={{ top: setResponsive('basex7', 'basex7', 'basex10') }}>
      <Hero />

      <Tabs activeIndex={activeIndex} text>
        {tabConfigs.map(({ id, Component }) => (
          <Tab
            key={id}
            title={getReadable(id)}
            onClick={() => push(`/compendia/${id}`)}
          >
            <Component />
          </Tab>
        ))}
      </Tabs>

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
      type,
      notFound: !response.ok
    }
  }
}

export default Compendia
