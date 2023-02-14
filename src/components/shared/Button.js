import { useResponsive } from 'hooks/useResponsive'
import { Box, Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'
import { IconSpinner } from './IconSpinner'

/* NOTE: 
- Set the prop 'light' to true for the dark background
- Set the prop 'badge' to true for the badged button
*/

const CustomButton = styled(GrommetButton)`
  position: relative;

  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${({ large, viewport }) =>
    large &&
    css`
      font-size: ${viewport !== 'small' ? '20px' : '16px'};
      padding: ${viewport !== 'small' ? '16px 32px' : '4px 24px'};
    `}  
  ${({ theme, light, primary }) =>
    primary &&
    light &&
    css`
      background: ${theme.global.colors.white};
      border-color: ${theme.global.colors.white};
      color: ${theme.global.colors.brand};
      &:hover {
        background: ${theme.global.colors['alex-navy-tint-90']};
        border-color: ${theme.global.colors['alex-navy-tint-90']};
        color: ${theme.global.colors.brand};
      }
    `}

  ${({ theme, light, secondary }) =>
    secondary &&
    light &&
    css`
      background: none;
      border-color: ${theme.global.colors.white};
      color: ${theme.global.colors.white};
      &:hover {
        background: ${theme.global.colors.white};
        border-color: ${theme.global.colors.white};
        color: ${theme.global.colors.brand};
      }
    `}

    ${({ theme, isLoading }) =>
    isLoading &&
    css`
      background: ${theme.global.colors.brand};
      border-color: ${theme.global.colors.brand};
      color: ${theme.global.colors.brand};
      &:hover {
        background: ${theme.global.colors.brand};
        color: ${theme.global.colors.brand};
      }
    `}

    ${({ theme, tertiary, isLoading }) =>
    tertiary &&
    css`
      background: ${isLoading ? theme.global.colors.black : 'none'};
      border: 1px solid ${theme.global.colors.black};
      color: ${theme.global.colors.black};
      &:hover {
        background: ${theme.global.colors.black};
        color: ${isLoading
          ? theme.global.colors.black
          : theme.global.colors.white};
      }
    `}
`

export const Button = ({
  isLoading = false,
  label = '',
  large = false,
  link = false,
  linkFontSize = 'small',
  responsive = false,
  tertiary = false,
  uppercase = false,
  width,
  clickHandler,
  ...props
}) => {
  const { viewport } = useResponsive()

  return (
    <Box
      responsive={responsive}
      width={
        width || (responsive && viewport === 'small' ? '100%' : 'max-content')
      }
      viewport={viewport}
    >
      {link ? (
        <GrommetButton
          link={link}
          label={label}
          style={{
            fontSize: linkFontSize,
            border: 'none',
            padding: 0,
            textDecoration: 'underline'
          }}
          onClick={clickHandler}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      ) : (
        <CustomButton
          disabled={isLoading}
          isLoading={isLoading}
          label={
            <>
              {isLoading && (
                <IconSpinner
                  style={{
                    position: 'absolute',
                    top: '25%', // NOTE: temporary set these values
                    left: '45%' // since 'translate3d' is ignored (bug)
                  }}
                />
              )}
              {label}
            </>
          }
          large={large}
          tertiary={tertiary}
          uppercase={uppercase}
          viewport={viewport}
          width={width}
          onClick={clickHandler}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      )}
    </Box>
  )
}

export default Button
