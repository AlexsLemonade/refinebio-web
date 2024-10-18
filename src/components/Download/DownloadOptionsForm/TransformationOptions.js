import { Box, Select, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import getReadableOptions from 'helpers/getReadableOptions'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'

export const TransformationOptions = ({
  value,
  handleChange,
  handleUpdateDownloadOptions = () => {},
  name = 'scale_by',
  column = false
}) => {
  const { setResponsive } = useResponsive()
  const scaleByValues = ['NONE', 'MINMAX', 'STANDARD']

  return (
    <>
      <Box
        margin={{
          top: setResponsive('small', 'none'),
          left: column ? 'none' : setResponsive('none', 'medium')
        }}
      >
        <Text margin={{ bottom: column ? 'small' : 'none' }}>
          Transformation{' '}
          <Anchor
            href={links.refinebio_docs_transformation}
            title="What does transformation mean?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="Help" size="small" />
          </Anchor>
        </Text>
      </Box>
      <Box
        margin={{
          top: setResponsive('xsmall', 'none'),
          left: column ? 'none' : setResponsive('none', 'xsmall')
        }}
        width="150px"
      >
        <Select
          labelKey="label"
          name={name}
          options={getReadableOptions(scaleByValues)}
          value={value}
          valueKey={{ key: 'value', reduce: true }}
          margin={{ horizontal: 'xxsmall' }}
          onChange={(e) => {
            handleUpdateDownloadOptions(name, e.value)
            return handleChange({ target: { name, value: e.value } })
          }}
        />
      </Box>
    </>
  )
}

export default TransformationOptions
