import { useState } from 'react'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Icon } from 'components/shared/Icon'
import { Link } from 'components/shared/Link'
import { formatString } from 'helpers/formatString'

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = [],
  charCount = 300
}) => {
  const [toggleDesciption, setToggleDescription] = useState(
    description.length > charCount
  )

  return (
    <Box pad={{ top: 'medium', bottom: 'small' }}>
      <Box>
        <Heading level={5} weight="500">
          Description
        </Heading>
        {description ? (
          <Box
            animation={
              !toggleDesciption ? { type: 'fadeIn', duration: 1000 } : {}
            }
          >
            <Paragraph>
              {toggleDesciption
                ? `${description.slice(0, charCount)} ...`
                : description}
              {description.length > charCount && (
                <Text
                  color="brand"
                  margin={{ left: 'xsmall' }}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  role="button"
                  onClick={() => setToggleDescription(!toggleDesciption)}
                >
                  See
                  {toggleDesciption ? (
                    <>
                      {' '}
                      More
                      <Icon
                        margin={{ left: 'xxsmall' }}
                        name="ChevronDown"
                        size="13px"
                      />
                    </>
                  ) : (
                    <>
                      {' '}
                      Less{' '}
                      <Icon
                        margin={{ left: 'xxsmall' }}
                        name="ChevronUp"
                        size="13px"
                      />
                    </>
                  )}
                </Text>
              )}
            </Paragraph>
          </Box>
        ) : (
          <Text color="gray-shade-40">
            <i>No description</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} weight="500">
          Publication Title
        </Heading>
        {publicationTitle ? (
          <Text>{publicationTitle}</Text>
        ) : (
          <Text color="gray-shade-40">
            <i>No associated publication</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} weight="500">
          Alternate Accession IDs
        </Heading>
        {alternateAccessionCode ? (
          <Link href={SearchCardBody.url} label={alternateAccessionCode} />
        ) : (
          <Text color="gray-shade-40">
            <i>None</i>
          </Text>
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} weight="500">
          Sample Metadata Fields
        </Heading>
        <Box direction="row">
          {sampleMetadataFields.length > 0 ? (
            <Text>{formatString(sampleMetadataFields.join(', '))}</Text>
          ) : (
            <Text color="gray-shade-40">
              <i>No sample metadata fields</i>
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SearchCardBody
