const borderColor = '#999' // 'gray-shade-40'
const rowHoverBG = '#F2F2F2' // 'gray-shade-5'

export default {
  header: {
    align: 'center',
    border: null,
    fill: 'horizontal',
    pad: 'small',
    verticalAlign: 'middle'
  },
  body: {
    align: 'center',
    border: null,
    verticalAlign: 'middle'
  },
  footer: {
    border: null
  },
  extend: ({ theme }) => `
      background: ${theme.global.colors.white}; 

      tbody {
        tr {
          border-top: 1px solid ${borderColor};
          &:hover td {
              background:  ${rowHoverBG};
          }
          td {
            padding: 16px;
            > span { 
              font-size: inherit; 
            }
          }
        }
      }
    `
}
