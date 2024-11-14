import { useRouter } from 'next/router'
import { Box, Tab } from 'grommet'
import { useCompendia } from 'hooks/useCompendia'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import getReadable from 'helpers/getReadable'
import { SignUpBlock } from 'components/shared/SignUpBlock'
import { Tabs } from 'components/shared/Tabs'
import { Hero } from 'components/Compendia/Hero'
import { NormalizedTab } from 'components/Compendia/NormalizedTab'
import { RNASeqTab } from 'components/Compendia/RNASeqTab'

export const Compendia = ({ compendia }) => {
  const { setResponsive } = useResponsive()
  const { push } = useRouter()
  const { type } = useCompendia(compendia)

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

  // The routes path must be one of the following
  const validTypes = ['normalized', 'rna-seq']
  if (!validTypes.includes(type)) {
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
      notFound: !response.ok
    }
  }
}

export default Compendia
