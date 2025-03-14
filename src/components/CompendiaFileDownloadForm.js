import { useEffect, useState } from 'react'
import { Heading, Text } from 'grommet'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import formatBytes from 'helpers/formatBytes'
import formatString from 'helpers/formatString'
import { Anchor } from 'components/Anchor'
import { Button } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { Column } from 'components/Column'
import { Row } from 'components/Row'
import { links } from 'config'

export const CompendiaFileDownloadForm = ({ compendium }) => {
  const { setResponsive } = useResponsive()
  const { acceptedTerms, setAcceptedTerms } = useRefinebio()
  const [isTermsChecked, setIsTermsChecked] = useState(acceptedTerms)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (submitted) {
      setAcceptedTerms(isTermsChecked)
    }
  }, [acceptedTerms, submitted])

  return (
    <Column align={setResponsive('center', 'start')}>
      <Heading level={1} margin={{ bottom: 'small' }}>
        Download the {formatString(compendium.primary_organism_name)} compendium
      </Heading>
      <Text>
        Download size: {formatBytes(compendium.computed_file.size_in_bytes)}
      </Text>
      <Row direction={setResponsive('column', 'column', 'row')} width="100%">
        <Row
          align={setResponsive('start', 'start', 'center')}
          direction={setResponsive('column', 'column', 'row')}
          justify="start"
          margin={{
            top: 'small'
          }}
          fill
        >
          <Column align={setResponsive('center', 'start')}>
            <CheckBox
              label={
                <Text>
                  I agree to the{' '}
                  <Anchor
                    label="Terms of Use"
                    href={links.terms_of_use}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </Text>
              }
              checked={isTermsChecked}
              onClick={(e) => setIsTermsChecked(e.target.checked)}
            />
          </Column>
          <Column
            align={setResponsive('center', 'start')}
            margin={{
              top: setResponsive('medium', 'small', 'none'),
              left: acceptedTerms
                ? 'none'
                : setResponsive('none', 'none', 'medium')
            }}
          >
            <Button
              label="Download Now"
              disabled={!isTermsChecked}
              primary
              responsive
              onClick={() => setSubmitted(true)}
            />
          </Column>
        </Row>
      </Row>
    </Column>
  )
}

export default CompendiaFileDownloadForm
