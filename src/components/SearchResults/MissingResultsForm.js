import { Paragraph, Text } from 'grommet'
import { FormField } from 'components/shared/FormField'
import { RequestForm } from 'components/shared/RequestForm'
import { TextInput } from 'components/shared/TextInput'
import { TextNull } from 'components/shared/TextNull'
import { TextRequired } from 'components/shared/TextRequired'

export const MissingResultsForm = ({ closeForm, queryParam = '' }) => {
  return (
    <RequestForm
      formTitle=" Tell us what’s missing"
      illustration="lamp-illustration.svg"
      closeForm={closeForm}
    >
      <FormField>
        <Paragraph>
          List experiment accessions (separated by commas) you expect for search
          term{' '}
          {queryParam && (
            <>
              ‘<strong>{queryParam}</strong>’
            </>
          )}{' '}
          <TextRequired />
        </Paragraph>
        <Text margin={{ vertical: 'xsmall' }}>
          <i>Only accessions from GEO, SRA, and ArrayExpress are accepted.</i>
        </Text>
        <TextInput />
        <TextNull text="Example: GSE3303, E-MEXP-3405, SRP2422" />
      </FormField>
    </RequestForm>
  )
}

export default MissingResultsForm
