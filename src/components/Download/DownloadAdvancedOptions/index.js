import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Heading, Select, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'
import { ShareDatasetButton } from 'components/Dataset'
import { links } from 'config'
import { AdvancedOptionsButton } from './AdvancedOptionsButton'

export const DownloadAdvancedOptions = () => {
  const { setResponsive } = useResponsive()
  const aggirateOptions = ['Experiment', 'Species']
  const transformOptions = ['None', 'Zero to One', 'Z-score']
  const [optionAggregate, setOptionAggregate] = useState(aggirateOptions[0])
  const [optionTransformation, setOptionTransformation] = useState(
    transformOptions[0]
  )
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <Box>
        <Row>
          <Heading
            level={2}
            margin={{ bottom: 'small' }}
            size={setResponsive('h2_small', 'h2_large')}
          >
            My Dataset
          </Heading>
          <ShareDatasetButton />
        </Row>
        <Row direction={setResponsive('column', 'column', 'row')}>
          <Row align="center" justify="start">
            <Box
              margin={{ top: setResponsive('small', 'none') }}
              style={{ position: 'relative' }}
            >
              <Text>
                Aggregate{' '}
                <Anchor
                  href={links.refinebio_docs_aggregation}
                  title="What does aggregate mean?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="Help" size="small" />
                </Anchor>
              </Text>
            </Box>
            <Box
              margin={{
                top: setResponsive('xsmall', 'none'),
                left: setResponsive('none', 'xsmall')
              }}
              width="130px"
            >
              <Select
                options={aggirateOptions}
                value={optionAggregate}
                onChange={({ option }) => setOptionAggregate(option)}
              />
            </Box>
            <Box
              margin={{
                top: setResponsive('small', 'none'),
                left: setResponsive('none', 'medium')
              }}
            >
              <Text>
                Transformation{' '}
                <Anchor
                  href={links.refinebio_docs_transformation}
                  title="What does transfirmation mean?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="Help" size="small" />
                </Anchor>
              </Text>
            </Box>
            <Box
              margin={{
                top: setResponsive('xsmall', 'none'),
                left: setResponsive('none', 'xsmall')
              }}
              width="150px"
            >
              <Select
                options={transformOptions}
                value={optionTransformation}
                onChange={({ option }) => setOptionTransformation(option)}
              />
            </Box>
            <Box
              margin={{
                top: setResponsive('xsmall', 'none'),
                left: setResponsive('none', 'xsmall')
              }}
            >
              <AdvancedOptionsButton toggle={toggle} setToggle={setToggle} />
            </Box>
          </Row>
          <Button
            label="Download"
            primary
            responsive
            margin={{ top: setResponsive('medium', 'medium', 'none') }}
          />
        </Row>
      </Box>
      <Box
        margin={{ top: 'small' }}
        height="auto"
        style={{
          overflow: 'hidden',
          maxHeight: toggle ? '200px' : '0',
          transition: 'max-height .5s ease-in-out'
        }}
      >
        <Heading level={5} weight="500" margin={{ bottom: 'xsmall' }}>
          Advanced Options
        </Heading>
        <Box direction="row">
          <CheckBox label="Skip quantile normalization for RNA-seq samples" />
          <Anchor
            href={
              links.refinebio_docs_quantile_normalization_for_rna_seq_samples
            }
            title="What does it mean to skip quantile normalization for RNA-seq samples?"
            target="_blank"
            rel="noopener noreferrer"
            margin={{ left: 'xxsmall' }}
          >
            <Icon name="Help" size="small" />
          </Anchor>
        </Box>
      </Box>
    </>
  )
}

export default DownloadAdvancedOptions
