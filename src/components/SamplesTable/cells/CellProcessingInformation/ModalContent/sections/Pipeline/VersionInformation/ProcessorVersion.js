import { VersionList, VersionItem } from './VersionList'

export const ProcessorVersion = ({ processor }) => {
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
    <VersionList>
      {vevrsionItems.map((versionItem) => (
        <VersionItem
          key={versionItem.title}
          title={versionItem.title}
          version={versionItem.version}
          versions={versionItem.versions}
        />
      ))}
    </VersionList>
  )
}

export default ProcessorVersion
