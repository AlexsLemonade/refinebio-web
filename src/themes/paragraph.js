export default {
  xsmall: {
    size: ' 12px' // 0.75rem
  },
  small: {
    size: '14px' // 0.875rem
  },
  medium: {
    size: '16px' // 1rem
  },
  large: {
    size: '18px' // 1.25rem
  },
  xlarge: {
    size: '22px' // 1.375rem
  },
  xxlarge: {
    size: '26px' // 1.625rem
  },
  extend: () => `
     max-width: none;
     + p {
        margin-top: 8px;
     }
  `
}
