import { useResponsive } from 'hooks/useResponsive'
import { Box, Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'
import { IconSpinner } from './IconSpinner'

/* NOTE: 
- Set the prop 'light' to true for the dark background
- Set the prop 'badge' to true for the badged button
*/

const CustomLinkButton = styled(GrommetButton)`
  position: relative;

  ${({ theme, linkColor }) => css`
    color: ${theme.global.colors[linkColor]};
    &:hover {
      color: ${theme.global.colors[linkColor]};
    }
  `}

  ${({ underlineOnHover }) =>
    underlineOnHover &&
    css`
      text-decoration: none !important;
      &:hover {
        text-decoration: underline !important;
      }
    `}
`

const CustomButton = styled(GrommetButton)`
  position: relative;

  ${({ underlineOnHover }) =>
    underlineOnHover &&
    css`
      text-decoration: none;
      &:hover {
        text-decoration: underline !important;
      }
    `}

  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${({ large, viewport }) =>
    large &&
    css`
      font-size: ${viewport !== 'small' ? '20px' : '16px'};
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
      line-height: 22px;
      &:hover {
        background: ${theme.global.colors.black};
        color: ${isLoading
          ? theme.global.colors.black
          : theme.global.colors.white};
      }
    `}
`

export const Button = ({
  linkColor = 'brand',
  display = 'flex',
  isLoading = false,
  label = '',
  large = false,
  link = false,
  linkFontSize = 'small',
  responsive = false,
  tertiary = false,
  textDecoration = 'underline',
  underlineOnHover = false,
  uppercase = false,
  width,
  clickHandler,
  ...props
}) => {
  const { viewport, setResponsive } = useResponsive()
  return (
    <Box
      responsive={responsive}
      width={
        width || (responsive && viewport === 'small' ? '100%' : 'max-content')
      }
      viewport={viewport}
      style={{ display }}
    >
      {link ? (
        <CustomLinkButton
          link={link}
          linkColor={linkColor}
          label={label}
          style={{
            border: 'none',
            fontSize: linkFontSize,
            padding: 0,
            textDecoration
          }}
          underlineOnHover={underlineOnHover}
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
          pad={setResponsive(
            {
              vertical: 'xxsmall',
              horizontal: 'large'
            },
            {
              vertical: 'small',
              horizontal: 'large'
            }
          )}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      )}
    </Box>
  )
}

export default Button
