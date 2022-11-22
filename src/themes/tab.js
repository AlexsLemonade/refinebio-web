const fontSize = '16px'
const height = '36px'

export default {
  active: {
    background: 'gray-shade-5'
  },
  background: {
    color: 'white'
  },
  border: {
    size: '3px',
    color: 'transparent',
    active: {
      color: 'brand'
    },
    hover: {
      color: 'transparent'
    }
  },
  margin: '0',
  pad: { horizontal: 'medium', vertical: 'xsmall' },
  extend: ({ theme }) => `
    border-right: 1px solid ${theme.global.colors['gray-shade-40']};
    height: ${height};
    span {
        color: ${theme.global.colors.black};
        font-size: ${fontSize};
    }
  `
}
