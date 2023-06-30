import { useState } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Heading, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'
import { links, options } from 'config'

export const DownloadNowButton = ({ accessionCode }) => {
  const { token, setToken } = useRefinebio()
  const { openModal } = useModal()
  const { setResponsive } = useResponsive()
  const id = `download-all-${accessionCode}`
  const [agree, setAgree] = useState(!!token)
  const [skipQuantile, setSkipQuantile] = useState(false)
  const [transformationOption, setTransformationOption] = useState(
    options.transformation[0].value
  )

  const handleAgreeToTerms = () => {
    setAgree(!agree)
    setToken(!token)
  }
  const handleStartProcessing = () => {
    // TEMP
  }

  return (
    <Modal
      id={id}
      button={
        <Button
          label="Download Now"
          secondary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
      width="600px"
    >
      <Box pad={{ bottom: 'small', horizontal: 'large' }}>
        <Box
          border={{ side: 'bottom' }}
          margin={{ bottom: 'medium' }}
          pad={{ bottom: 'small' }}
        >
          {/* fixed max-width to preserve UI layout in winder screens */}
          <Heading level={1}>Download All Samples Now</Heading>
        </Box>
        <Box margin={{ bottom: 'medium' }}>
          <Heading level={5} responsive={false} weight="600">
            Download Options
          </Heading>
        </Box>
        <Box margin={{ top: setResponsive('small', 'none') }}>
          <Text>
            Transformation{' '}
            <Anchor
              href={links.refinebio_docs_gene_transformation}
              title="What does transformation mean?"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="Help" size="small" />
            </Anchor>
          </Text>
        </Box>
        <Box
          margin={{ top: setResponsive('xsmall', 'none') }}
          width={setResponsive('100%', '150px')}
        >
          <Select
            options={Object.values(options.transformation)}
            labelKey="label"
            value={transformationOption}
            valueKey={{ key: 'value', reduce: true }}
            margin={{ top: 'xsmall' }}
            onChange={({ value: nextValue }) =>
              setTransformationOption(nextValue)
            }
          />
        </Box>
        <Box direction="row" margin={{ top: 'medium' }}>
          <CheckBox
            label="Skip quantile normalization for RNA-seq samples"
            onClick={() => setSkipQuantile(!skipQuantile)}
          />
          <Anchor
            href={links.refinebio_docs_quantile_normalization_rna_seq_samples}
            title="What does it mean to skip quantile normalization for RNA-seq samples?"
            target="_blank"
            rel="noopener noreferrer"
            margin={{ left: 'xxsmall' }}
          >
            <Icon name="Help" size="small" />
          </Anchor>
        </Box>
        <Text weight="bold" margin={{ top: 'large' }}>
          Putting the download files together takes about 10-20 minutes. Enter
          your email and we will send you the download link once your files are
          ready.
        </Text>
        <Box direction="row" margin={{ top: 'small' }}>
          <TextInput type="email" placeholder="jdoe@example.com" />
        </Box>
        <Box margin={{ top: 'small' }}>
          <CheckBox
            label={
              <Text>
                I agree to the{' '}
                <Anchor
                  href={links.terms}
                  label="Terms of Use"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Text>
            }
            onClick={handleAgreeToTerms}
          />
        </Box>
        <Box margin={{ top: 'small' }}>
          <CheckBox label="I would like to receive occasional updates from the refine.bio team" />
        </Box>
        <Box
          margin={{ top: 'large' }}
          alignSelf="end"
          width={setResponsive('100%', 'auto')}
        >
          <Button
            label="Start Processing"
            primary
            responsive
            onClick={handleStartProcessing}
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default DownloadNowButton
