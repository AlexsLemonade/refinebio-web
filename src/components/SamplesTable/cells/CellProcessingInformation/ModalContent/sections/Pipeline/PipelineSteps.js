import { Fragment } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Text } from 'grommet'
import styled, { css } from 'styled-components'

const Arrow = styled(Box)`
  ${({ theme }) => css`
    border-top: 2px solid ${theme.global.colors['gray-shade-40']};
    flex-grow: 1;
    position: relative;
    &:before,
    &:after {
      content: '';
      border-top: 2px solid ${theme.global.colors['gray-shade-40']};
      position: absolute;
      right: 0;
      width: 6px;
    }
    &:before {
      top: -4px;
      transform: rotate(38deg);
    }
    &:after {
      top: 0;
      transform: rotate(-38deg);
    }
  `}
`
const Step = ({ label, img: { url, height, width } }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center">
      <Box
        aria-hidden
        background={{
          image: `url(/${url})`,
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        margin={{ bottom: 'xsmall' }}
        height={height}
        width={width}
      />
      <Text textAlign="center" size={setResponsive('small', 'medium')}>
        {label}
      </Text>
    </Box>
  )
}

export const PipelineSteps = ({ results }) => {
  return (
    <Box
      align="center"
      direction="row"
      justify="around"
      margin={{ top: 'medium', bottom: 'large' }}
    >
      <Step
        label="Input File"
        img={{ url: 'file.svg', height: '25px', width: '30px' }}
      />
      <Arrow />
      {results.map(({ processor: { name } }) => (
        <Fragment key={name}>
          <Step
            label={name}
            img={{ url: 'processing.svg', height: '38px', width: '34px' }}
          />
          <Arrow />
        </Fragment>
      ))}
      <Step
        label="Gene Expression Matrix"
        img={{ url: 'file.svg', height: '25px', width: '30px' }}
      />
    </Box>
  )
}

export default PipelineSteps
