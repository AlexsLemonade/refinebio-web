import { useState } from 'react'
import { formatString } from 'helpers/formatString'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Icon } from 'components/shared/Icon'
import { Anchor } from 'components/shared/Anchor'
import { TextNull } from 'components/shared/TextNull'

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = [],
  charLimit = 300
}) => {
  const [toggleDesciption, setToggleDescription] = useState(
    description.length > charLimit
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
                ? `${description.slice(0, charLimit)} ...`
                : description}
              {description.length > charLimit && (
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
          <TextNull text="No description" />
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} weight="500">
          Publication Title
        </Heading>
        {publicationTitle ? (
          <Text>{publicationTitle}</Text>
        ) : (
          <TextNull text="No associated publication" />
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} weight="500">
          Alternate Accession IDs
        </Heading>
        {alternateAccessionCode ? (
          <Anchor href={SearchCardBody.url} label={alternateAccessionCode} />
        ) : (
          <TextNull text="None" />
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
            <TextNull text="No sample metadata fields" />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SearchCardBody
