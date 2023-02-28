import { memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { isEmptyObject } from 'helpers/isEmptyObject'
import { Box, Heading } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'
import { links } from 'config'
import { Pipeline, SubmitterSupplied } from './sections'

export const ModalContent = ({ results, sample }) => {
  const { setResponsive } = useResponsive()
  const pipelinesText = results.map((result) => result.processor.name)
  const isSubmitterProcessed = pipelinesText.every(
    (pipelineText) => pipelineText === 'Submitter-processed'
  )

  return (
    <Modal center={false} width={setResponsive('100vw', '100vw', '950px')}>
      <Box margin={{ bottom: 'small' }} pad={{ horizontal: 'large' }}>
        <Heading level={1}>Processing Information</Heading>
      </Box>
      <Box margin={{ bottom: 'small' }}>
        {isSubmitterProcessed ? (
          <Box margin={{ bottom: 'medium' }} pad={{ horizontal: 'large' }}>
            <Pill
              label={
                <Anchor
                  href={links.refinebio_docs_processed_badge}
                  label="Submitter processed"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              status="warning"
            />
          </Box>
        ) : (
          <>
            <Box pad={{ horizontal: 'large' }}>
              <Box margin={{ bottom: 'medium' }}>
                <Pill
                  label={
                    <Anchor
                      href={links.refinebio_docs_processed_badge}
                      label="refine.bio processed"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  status="success"
                />
              </Box>
              <Pipeline
                isSubmitterProcessed={isSubmitterProcessed}
                pipelinesText={pipelinesText}
                results={results}
                sample={sample}
              />
            </Box>
            <Box
              border={{ side: 'top' }}
              margin={{ top: 'medium' }}
              pad={{ top: 'large' }}
            />
          </>
        )}

        {!isEmptyObject(sample.protocol_info) && (
          <SubmitterSupplied
            isSubmitterProcessed={isSubmitterProcessed}
            protocolInfo={sample.protocol_info}
            sample={sample}
          />
        )}
      </Box>
    </Modal>
  )
}

export default memo(ModalContent)
