import { Box, Paragraph, Text, TextArea } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { FormField } from 'components/FormField'
import { RadioButtonGroup } from 'components/RadioButtonGroup'
import { TextInput } from 'components/TextInput'
import { TextRequired } from 'components/TextRequired'

export const RequestForm = ({
  errors,
  handleChange,
  isSubmitting,
  touched,
  values,
  onSubmit
}) => {
  const { setResponsive } = useResponsive()
  const maxCharsForComments = 255
  const radioPediatricCancer = ['Yes', 'No']
  const radioPrimaryApproach = [
    'Bench Research',
    'Computational Research',
    'Clinical Research',
    'AI/ML Research'
  ]

  return (
    <Box>
      <FormField>
        <Paragraph margin={{ bottom: 'small' }}>
          Are you using this for pediatric cancer research? <TextRequired />
        </Paragraph>
        <RadioButtonGroup
          error={errors.pediatric_cancer}
          errorText={errors.pediatric_cancer}
          labelOnly
          name="pediatric_cancer"
          options={radioPediatricCancer}
          touched={touched.pediatric_cancer}
          values={values.pediatric_cancer}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Paragraph margin={{ bottom: 'small' }}>
          Which of these most closely describes your primary approach?{' '}
          <TextRequired />
        </Paragraph>
        <RadioButtonGroup
          error={errors.approach}
          errorText={errors.approach}
          labelOnly
          options={radioPrimaryApproach}
          name="approach"
          touched={touched.approach}
          value={values.approach}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Paragraph margin={{ bottom: 'xsmall' }}>
          Is there anything else you would like to add?
        </Paragraph>
        <TextArea
          maxLength={225}
          name="comments"
          value={values.comments}
          onChange={handleChange}
        />
        <Text alignSelf="end" margin={{ top: 'xxsmall' }} size="small">
          {`Characters remaining: ${
            maxCharsForComments - values.comments.length
          }`}
        </Text>
      </FormField>
      <FormField>
        <Text>
          Email <TextRequired />
        </Text>
        <Paragraph margin={{ top: 'small' }}>
          <i>Be notified when your requested experiment(s) become available</i>
        </Paragraph>
        <TextInput
          error={errors.email}
          errorText={errors.email}
          labelOnly
          name="email"
          placeholder="jdoe@example.com"
          positionTop="-40px"
          touched={touched.email}
          type="email"
          value={values.email}
          width={{ max: '520px' }}
          onChange={handleChange}
        />
        <Box margin={{ vertical: 'xsmall' }}>
          <CheckBox
            label="I would like to receive occasional updates from the refine.bio team"
            name="email_updates"
            value={values.email_updates}
            onChange={handleChange}
          />
        </Box>
      </FormField>
      <FormField
        direction={setResponsive('column', 'row')}
        gap={setResponsive('small', 'xsmall')}
      >
        <Button label="Cancel" secondary responsive onClick={onSubmit} />
        <Button
          label="Submit"
          isLoading={isSubmitting}
          primary
          responsive
          type="submit"
        />
      </FormField>
    </Box>
  )
}

export default RequestForm
