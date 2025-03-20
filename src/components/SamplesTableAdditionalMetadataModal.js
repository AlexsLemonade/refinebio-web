import { Fragment, memo, useState } from 'react'
import { nanoid } from 'nanoid'
import { Box, Heading, Text } from 'grommet'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { useResponsive } from 'hooks/useResponsive'
import fromPairs from 'helpers/fromPairs'
import isArray from 'helpers/isArray'
import isObject from 'helpers/isObject'
import isString from 'helpers/isString'
import isValidURL from 'helpers/isValidURL'
import { Anchor } from 'components/Anchor'
import { LabelTextInput } from 'components/LabelTextInput'
import { InformationList, InformationItem } from 'components/InformationList'
import { InlineMessage } from 'components/InlineMessage'
import { Row } from 'components/Row'
import { TextHighlight } from 'components/TextHighlight'
import { TextNull } from 'components/TextNull'

const AnnotationText = ({ value }) => {
  if (isString(value)) {
    if (isValidURL(value)) {
      return (
        <Anchor
          href={value}
          label={value}
          rel="nofollow noopener noreferrer"
          target="_blank"
        />
      )
    }

    return <TextHighlight>{value}</TextHighlight>
  }

  return <Text as="code">{JSON.stringify(value)}</Text>
}

const AnnotationValue = ({ value }) => {
  if (isString(value)) {
    return <AnnotationText value={value} />
  }

  if (isArray(value)) {
    return value.map((v, i) => (
      <Box
        key={nanoid()}
        direction="row"
        margin={{ top: i ? 'xsmall' : 'none' }}
      >
        <AnnotationText value={v} />
      </Box>
    ))
  }

  if (isObject(value)) {
    if (Object.keys(value).length === 2 && !!value.value) {
      const keyName = Object.keys(value).find((key) => key !== 'value')
      return (
        <>
          <AnnotationText value={value[keyName]} />
          {': '}
          <AnnotationText value={value.value} />
        </>
      )
    }

    return Object.keys(value).map((key) => (
      <Box key={key} direction="row">
        <AnnotationText value={key} />
        <AnnotationText value={value[key]} />
      </Box>
    ))
  }

  return <Text as="code">{JSON.stringify(value)}</Text>
}

export const ModalContent = ({ value }) => {
  if (isArray(value) && value.length === 1) {
    return <AnnotationText value={value[0]} />
  }

  const valueIsObject = isArray(value) || !isObject(value)
  // checks if it's an array with objects(key/values) with only two keys
  // and one of them is 'value'
  if (
    isArray(value) &&
    value.length > 0 &&
    value.every((v) => Object.keys(v).length === 2 && !!v.value)
  ) {
    const valueAsObject = fromPairs(
      value.map((v) => {
        const keyName = Object.keys(v).find((key) => key !== 'value')

        return [v[keyName], v.value]
      })
    )

    return <AnnotationValue value={valueAsObject} />
  }

  return (
    <Box>
      {valueIsObject ? (
        <AnnotationValue value={value} />
      ) : (
        Object.keys(value).map((key) => (
          <Fragment key={nanoid()}>
            <strong>
              <AnnotationText value={key} />
            </strong>
            <AnnotationValue value={value[key]} />
          </Fragment>
        ))
      )}
    </Box>
  )
}

export const SamplesTableAdditionalMetadataModal = ({ annotations }) => {
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
            <LabelTextInput
              value={filter}
              placeholder="Filter metadata"
              onChange={setFilter}
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
                value={<ModalContent value={formattedAnnotations[0][key]} />}
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

export default memo(SamplesTableAdditionalMetadataModal)
