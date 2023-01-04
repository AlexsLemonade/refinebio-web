const gray = 'gray-shade-40'
const alternateRowBg = 'gray-shade-5'
const rowHoverBG = '#E2E2E2'

export default {
  header: {
    border: null,
    fill: 'horizontal',
    pad: { horizontal: 'small', vertical: 'xsmall' },
    verticalAlign: 'middle',
    extend: ({ theme }) => `  
         box-shadow: 1px 0 0 0 ${theme.global.colors[gray]} inset, 0 1px 0 0 ${theme.global.colors[gray]} inset;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
    `
  },
  body: {
    border: null,
    extend: ({ theme }) => `  
      box-shadow: 1px 0 0 0  ${theme.global.colors[gray]} inset, 0 1px 0 0 ${theme.global.colors[gray]} inset;  
      font-size: 14px;  
      white-space: nowrap;
    `
  },
  extend: ({ theme }) => `
      background: ${theme.global.colors.white};
      border-bottom: 1px solid  ${theme.global.colors[gray]};
      border-right: 1px solid  ${theme.global.colors[gray]};
      tr {
          &:nth-child(even) td {
              background: ${theme.global.colors[alternateRowBg]}
          }
          &:hover td {
              background:  ${rowHoverBG};
          }
      }
    `
}
