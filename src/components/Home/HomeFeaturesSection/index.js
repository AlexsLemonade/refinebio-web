import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import { FolderIcon } from '../../../images/graphic-folder.svg'
import { SearchIcon } from '../../../images/graphic-search.svg'
import { Card } from './Card'

export const HomeFeaturesSection = () => {
  const { viewport, setResponsive } = useResponsive()

  return (
    <FixedContainer>
      <Row direction={setResponsive('column', 'column', 'row')}>
        <Card
          heading="Find the data you need"
          body={
            <>
              Search the multi-organism collection of genome wide gene
              expression data obtained from publicly available sources like GEO,
              ArrayExpress, and SRA. The data has been processed uniformly and
              normalized using a set of{' '}
              <Anchor
                href={links.refinebio_docs_standard_pipeline}
                label="standardized pipelines"
                rel="noopener noreferrer"
              />{' '}
              curated by the{' '}
              <Anchor
                href={links.ccdl}
                label="Childhood Cancer Data Lab (CCDL)"
                rel="noopener noreferrer"
              />
            </>
          }
          svgIcon={<SearchIcon />}
          margin={{ right: setResponsive('none', 'none', 'basex9') }}
        />
        {viewport === 'large' && (
          <Box
            border={{ color: 'gray-shade-5', side: 'left', size: 'large' }}
          />
        )}
        <Card
          heading="Create custom datasets"
          body="Build and download custom datasets tailored to your needs
              including gene expression matrices and sample metadata."
          svgIcon={<FolderIcon />}
          margin={{
            top: setResponsive('basex7', 'none'),
            left: setResponsive('none', 'none', 'basex9')
          }}
          pad={{
            top: setResponsive('none', 'xlarge', 'none')
          }}
        />
      </Row>
    </FixedContainer>
  )
}

export default HomeFeaturesSection
