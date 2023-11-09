import { memo, useState } from 'react'
import { nanoid } from 'nanoid'
import { Box, Heading, Text } from 'grommet'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { useResponsive } from 'hooks/useResponsive'
import { FilterTextInput } from 'components/shared/FilterTextInput'
import {
  InformationList,
  InformationItem
} from 'components/shared/InformationList'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'
import { Annotation } from './Annotation'

export const ModalContent = ({ annotations }) => {
  const { setResponsive } = useResponsive()
  const [filter, setFilter] = useState('')

  const getAnnotations = () =>
    annotations.map((annotation) => {
      const temp = {}

      for (const [key, value] of Object.entries(annotation)) {
        if (
          (value &&
            JSON.stringify(value)
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())) ||
          key.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        ) {
          temp[key] = value
        }
      }

      return temp
    })

  const formattedAnnotations = getAnnotations()
  const anyAnnotationsMatchingFilter = formattedAnnotations.some(
    (meta) => Object.keys(meta).length > 0
  )

  return (
    <TextHighlightContextProvider match={filter}>
      <Box
        margin={{ bottom: 'small' }}
        pad={{ horizontal: setResponsive('xsmall', 'xsmall', 'large') }}
      >
        <Heading level={1} margin={{ bottom: 'large' }}>
          Additional Metadata
        </Heading>
        <Row
          align={setResponsive('start', 'center')}
          width={setResponsive('100%', 'auto')}
        >
          <Box
            align="center"
            direction="row"
            margin={{ bottom: setResponsive('small', 'none') }}
            width={setResponsive('100%', 'auto')}
          >
            <FilterTextInput
              setFilter={setFilter}
              placeholder="Filter metadata"
            />
          </Box>
          <InlineMessage
            label="Sample metadata included in download"
            fontSize={setResponsive('small', 'medium')}
          />
        </Row>
      </Box>
      <Box
        height={{ max: setResponsive('85vh', '82vh', '700px') }}
        margin={{
          bottom: setResponsive('none', 'none', '-24px'),
          left: '-24px'
        }}
        width={{ min: 'calc(100% + 48px)', max: 'none' }}
      >
        {anyAnnotationsMatchingFilter ? (
          <InformationList style={{ overflow: 'auto', overflowX: 'hidden' }}>
            {Object.keys(formattedAnnotations[0]).map((key) => (
              <InformationItem
                key={nanoid()}
                field={key}
                value={<Annotation value={formattedAnnotations[0][key]} />}
              />
            ))}
          </InformationList>
        ) : (
          <Box
            margin={{ vertical: 'medium' }}
            pad={{ horizontal: setResponsive('large', 'large', 'basex7') }}
          >
            <TextNull
              text={
                <>
                  No metadata found matching{' '}
                  <Text color="black" style={{ fontStyle: 'normal' }}>
                    <strong>"{filter}"</strong>
                  </Text>
                </>
              }
            />
          </Box>
        )}
      </Box>
    </TextHighlightContextProvider>
  )
}

export default memo(ModalContent)
