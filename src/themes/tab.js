const fontSize = '16px'

export default {
  active: {
    background: 'white'
  },
  background: {
    color: 'gray-shade-5'
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
  margin: 'none',
  pad: { horizontal: 'medium', vertical: 'xsmall' },
  extend: ({ theme }) => `
    border-right: 1px solid ${theme.global.colors['gray-shade-40']};
    span {
        color: ${theme.global.colors.black};
        font-size: ${fontSize};
    }
  `
}
