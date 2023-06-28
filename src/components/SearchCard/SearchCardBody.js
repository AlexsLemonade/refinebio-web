import { useState } from 'react'
import { formatSampleMetadata } from 'helpers/dataset'
import getURLForAccessionCode from 'helpers/getURLForAccessionCode'
import { Box, Heading, Paragraph, Text } from 'grommet'
import { Icon } from 'components/shared/Icon'
import { Anchor } from 'components/shared/Anchor'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

export const SearchCardBody = ({
  alternateAccessionCode = '',
  description = '',
  publicationTitle = '',
  sampleMetadataFields = []
}) => {
  const maxLength = 300
  const [toggleDesciption, setToggleDescription] = useState(
    description.length > maxLength
  )

  return (
    <Box pad={{ top: 'medium', bottom: 'small' }}>
      <Box>
        <Heading level={5} responsive={false} weight="500">
          Description
        </Heading>
        {description ? (
          <Box
            animation={
              !toggleDesciption ? { type: 'fadeIn', duration: 1000 } : {}
            }
          >
            <Paragraph>
              <TextHighlight>
                {toggleDesciption
                  ? `${description.slice(0, maxLength)} ...`
                  : description}
              </TextHighlight>
              {description.length > maxLength && (
                <Text
                  color="brand"
                  margin={{ left: 'xsmall' }}
                  role="button"
                  style={{
                    boxShadow: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
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
                      Less
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
        <Heading level={5} responsive={false} weight="500">
          Publication Title
        </Heading>
        <Paragraph>
          {publicationTitle ? (
            <TextHighlight>{publicationTitle}</TextHighlight>
          ) : (
            <TextNull text="No associated publication" />
          )}
        </Paragraph>
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} responsive={false} weight="500">
          Alternate Accession IDs
        </Heading>
        {alternateAccessionCode ? (
          <Anchor
            href={getURLForAccessionCode(alternateAccessionCode)}
            target="_blank"
            label={<TextHighlight>{alternateAccessionCode}</TextHighlight>}
          />
        ) : (
          <TextNull text="None" />
        )}
      </Box>
      <Box margin={{ top: 'small' }}>
        <Heading level={5} responsive={false} weight="500">
          Sample Metadata Fields
        </Heading>
        <Box direction="row">
          <Paragraph>
            {sampleMetadataFields.length > 0 ? (
              <TextHighlight>
                {formatSampleMetadata(sampleMetadataFields).join(', ')}
              </TextHighlight>
            ) : (
              <TextNull text="No sample metadata fields" />
            )}
          </Paragraph>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchCardBody
