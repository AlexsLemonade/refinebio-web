import { useResponsive } from 'hooks/useResponsive'
import { getHeadingSize } from 'helpers/getHeadingSize'
import {
  Box,
  CheckBox,
  Heading,
  Paragraph,
  RadioButtonGroup,
  Text,
  TextArea
} from 'grommet'
import { Button } from 'components/shared/Button'
import { TextInput } from 'components/shared/TextInput'
import { TextRequired } from 'components/shared/TextRequired'
import { FieldBlock } from './FieldBlock'

export const RequestForm = ({
  formTitle,
  illustration,
  children,
  closeForm
}) => {
  const { viewport, setResponsive } = useResponsive()
  const radioPediatricCancer = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]
  const radioPrimaryApproach = [
    { label: 'Bench Research', value: 'Bench Research' },
    { label: 'Computational Research', value: 'Computational Research' },
    { label: 'Clinical Research', value: 'Clinical Research' },
    { label: 'AI/ML Research', value: 'AI/ML Research' }
  ]

  return (
    <Box
      animation={{ type: 'fadeIn', duration: 500 }}
      direction="row"
      justify="between"
    >
      <Box
        border={{ color: 'brand-tint-80', side: 'bottom', size: '16px' }}
        pad={{ horizontal: 'large', vertical: 'xlarge' }}
        width={setResponsive('100%', '100%', '800px')} // to preserve the UI for the desktop view
        style={{ boxShadow: ' 0px 3px 20px rgba(0, 0, 0, 0.1)' }}
      >
        <FieldBlock>
          <Heading level={1} size={getHeadingSize('small', 1)}>
            {formTitle}
          </Heading>
        </FieldBlock>
        {children}
        <FieldBlock>
          <Heading
            level={2}
            size={getHeadingSize('xsmall', 2)}
            margin={{ bottom: 'xsmall' }}
          >
            Help us priortize your request by answering these questions
          </Heading>
          <Paragraph>
            Are you using this for pediatric cancer research? <TextRequired />
          </Paragraph>
          <RadioButtonGroup
            options={radioPediatricCancer}
            name="pediatric-cancer"
            margin={{ top: 'small' }}
          />
        </FieldBlock>
        <FieldBlock>
          <Paragraph>
            Which of these most closely describes your primary approach?{' '}
            <TextRequired />
          </Paragraph>
          <RadioButtonGroup
            options={radioPrimaryApproach}
            name="primary-approach"
            margin={{ top: 'small' }}
          />
        </FieldBlock>
        <FieldBlock>
          <Paragraph margin={{ bottom: 'xsmall' }}>
            Is there anything else you would like to add?
          </Paragraph>
          <TextArea />
        </FieldBlock>
        <FieldBlock>
          <Paragraph>
            Email <TextRequired />
          </Paragraph>
          <Text margin={{ vertical: 'xsmall' }}>
            <i>
              Be notified when your requested experiment(s) become available
            </i>
          </Text>
          <TextInput
            name="comments"
            placeholder="jdoe@example.com"
            type="email"
          />
          <Box margin={{ vertical: 'xsmall' }}>
            <CheckBox label="I would like to receive occasional updates from the refine.bio team" />
          </Box>
        </FieldBlock>
        <FieldBlock
          direction={setResponsive('column', 'row')}
          gap={setResponsive('small', 'xsmall')}
        >
          <Button label="Cancel" secondary responsive onClick={closeForm} />
          <Button label="Submit" primary responsive type="submit" />
        </FieldBlock>
      </Box>
      {viewport === 'large' && (
        <Box
          aria-hidden
          background={{
            image: ` url('/${illustration}')`,
            position: 'center',
            repeat: 'no-repeat',
            size: 'contain'
          }}
          margin={{ right: setResponsive('none', 'large') }}
          // to preserve the width image
          width={setResponsive('150px', '250px')}
        />
      )}
    </Box>
  )
}

export default RequestForm
