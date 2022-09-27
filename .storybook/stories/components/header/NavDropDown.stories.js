import { NavDropDown } from 'components/header/NavDropDown'

export default {
  title: 'Components/Header/DropDown',
  component: NavDropDown
}

export const Default = () => (
  <NavDropDown
    label="Search"
    items={[
      { label: 'Menu Item 1', onClick: () => {} },
      { label: 'Menu Item 2', onClick: () => {} }
    ]}
  />
)
Default.storyName = 'Dropdown'
