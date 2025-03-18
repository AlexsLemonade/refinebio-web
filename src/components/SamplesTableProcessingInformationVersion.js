import { nanoid } from 'nanoid'
import styled, { css } from 'styled-components'
import { Box, Heading, Text } from 'grommet'
import pickObjectPropByKey from 'helpers/pickObjectPropByKey'
import { Accordion, AccordionPanel } from 'components/Accordion'

const List = styled(Box)`
  ${({ theme }) => css`
    > div:nth-of-type(odd) {
      background: ${theme.global.colors['gray-shade-5']};
    }
  `}
`

const Item = ({ title, version, versions }) => {
  return (
    <Box direction={version ? 'row' : 'column'} pad={{ vertical: 'xsmall' }}>
      <Box width={{ min: '160px' }}>
        <Heading level={5} responsive={false} weight="500">
          {title}
        </Heading>
      </Box>
      {versions &&
        Object.keys(versions).map((v) => (
          <Box key={v} direction="row">
            <Box margin={{ right: 'medium' }} width={{ min: '160px' }}>
              <Text textAlign="end">{v}</Text>
            </Box>
            <Box>
              <Text>{versions[v]}</Text>
            </Box>
          </Box>
        ))}
      {version && (
        <Box margin={{ left: 'medium' }}>
          <Text>{version}</Text>
        </Box>
      )}
    </Box>
  )
}

const ProcessorVersion = ({ processor }) => {
  const vevrsionItems = [
    { title: 'OS Packages', versions: processor.environment.os_pkg },
    {
      title: 'Python',
      versions: processor.environment.python
    },
    {
      title: 'OS Distribution',
      version: processor.environment.os_distribution
    }
  ]

  return (
    <List>
      {vevrsionItems.map((versionItem) => (
        <Item
          key={versionItem.title}
          title={versionItem.title}
          version={versionItem.version}
          versions={versionItem.versions}
        />
      ))}
    </List>
  )
}

export const SamplesTableProcessingInformationVersion = ({ results }) => {
  // returns an object with the primary versions that should be displayed in the modal
  // https://github.com/AlexsLemonade/refinebio-frontend/issues/65#issuecomment-401174943
  // (relevance) https://github.com/AlexsLemonade/refinebio-frontend/issues/293#issuecomment-420753323
  const getPrimaryPackages = (processor) => {
    switch (processor.name) {
      case 'Affymetrix SCAN':
        return pickObjectPropByKey(processor.environment.R, [
          'SCAN.UPC',
          'Brainarray'
        ])
      case 'Salmon Quant':
        // removes the text 'salmon'
        return {
          salmon: processor.environment.cmd_line['salmon --version']?.replace(
            'salmon ',
            ''
          )
        }
      case 'Tximport':
        return pickObjectPropByKey(processor.environment.R, ['tximport'])
      default:
        return false
    }
  }

  const renderProcessor = (processor) => {
    const primaryPackages = getPrimaryPackages(processor)
    if (!primaryPackages) return null

    return (
      <AccordionPanel
        key={processor.name}
        title={<Item title={processor.name} versions={primaryPackages} />}
      >
        <ProcessorVersion
          processor={processor}
          primaryPackages={primaryPackages}
        />
      </AccordionPanel>
    )
  }

  const renderGnomeVersion = () => {
    const salmonProcessedResult = results.find(
      (result) => result.processor.name === 'Salmon Quant'
    )
    if (
      !salmonProcessedResult ||
      !salmonProcessedResult.organism_index ||
      !salmonProcessedResult.organism_index.assembly_name
    ) {
      return null
    }

    const verionItems = [
      {
        'genome build': salmonProcessedResult.organism_index.assembly_name
      },
      {
        'database name': salmonProcessedResult.organism_index.database_name
      },
      {
        'release version': salmonProcessedResult.organism_index.release_version
      }
    ]

    return (
      <Box margin={{ top: 'small' }}>
        <Heading level={5} responsive={false} weight="500">
          Genome Build
        </Heading>
        {verionItems.map((versionItem) => (
          <Item key={nanoid()} versions={versionItem} />
        ))}
      </Box>
    )
  }

  return (
    <>
      <Heading level={2} size="small">
        Version Information
      </Heading>
      <Accordion>
        {results.map(({ processor }) => renderProcessor(processor))}
      </Accordion>
      <Box>{renderGnomeVersion()}</Box>
    </>
  )
}

export default SamplesTableProcessingInformationVersion
