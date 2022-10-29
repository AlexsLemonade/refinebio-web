import { Anchor, Menu, Nav as GrommentNav } from 'grommet'
import styled, { css } from 'styled-components'

const CustomNav = styled(GrommentNav)`
  ${({ theme, light }) => css`
    font-family: 'Rubik', sans-serif;
    flex-direction: row;

    a {
      color: ${light ? theme.global.colors.white : theme.global.colors.black};
      &:not(:first-child) {
        margin-left: 16px;
      }
      &:hover,
      &:focus {
        border-bottom: 1px solid
          ${light ? theme.global.colors.white : theme.global.colors.brand};
        color: ${light ? theme.global.colors.white : theme.global.colors.brand};
        text-decoration: none;
      }
    }

    button[aria-label='Open Menu'] {
      border-radius: 0;
      color: ${light ? theme.global.colors.white : theme.global.colors.black};
      margin-left: 16px;
      padding: 0;

      svg {
        fill: ${light ? theme.global.colors.white : theme.global.colors.black};
        stroke: ${light
          ? theme.global.colors.white
          : theme.global.colors.black};
      }
      &:hover,
      &[aria-expanded='true'] {
        border-bottom: 1px solid
          ${light ? theme.global.colors.white : theme.global.colors.brand};
        color: ${light ? theme.global.colors.white : theme.global.colors.brand};
        svg {
          fill: ${light
            ? theme.global.colors.white
            : theme.global.colors.brand};
          stroke: ${light
            ? theme.global.colors.white
            : theme.global.colors.brand};
        }
      }
    }
  `}
`

export const GlobalNav = ({ light, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CustomNav align="center" light={light} role="navigation" {...props}>
      <Anchor label="Search " href="#" />
      <Menu
        gap="0"
        label="Compendia"
        items={[
          { label: 'Normalized Compendia', onClick: () => {} },
          { label: 'RNA-seq Sample Compendia', onClick: () => {} }
        ]}
      />
      <Anchor label="Docs " href="#" />
      <Anchor label="About " href="/about" />
    </CustomNav>
  )
}

export default GlobalNav
