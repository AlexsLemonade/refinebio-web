export default {
  font: {
    family: `'Rubik', sans-serif`,
    height: 1.5
  },
  weight: 400,
  level: {
    1: {
      medium: {
        size: '26px', // 1.625rem
        height: 1.2 // (approx)31px
      },
      h1_xsmall: {
        size: '22px', // 2rem
        height: 1.1875 // 38px
      },
      h1_small: {
        size: '26px', // 2rem
        height: 1.1875 // 38px
      },
      h1_large: {
        size: '32px', // 2rem
        height: 1.1875 // 38px
      },
      h1_xlarge: {
        size: '46px', // 2rem
        height: 1.1875 // 38px
      }
    },
    2: {
      medium: {
        size: '22px', // 1.375rem
        height: 1.18 // (approx)26px
      },
      h2_xsmall: {
        size: '20px'
      },
      h2_small: {
        size: '22px'
      },
      h2_large: {
        size: '26px', // 1.75rem
        height: 1.178 // (approx)33px
      }
    },
    3: {
      medium: {
        size: '20px', // 1.25rem
        height: 1.2 // 24px
      },
      h3_small: {
        size: '20px'
      },
      h3_large: {
        size: '24px'
      }
    },
    4: {
      medium: {
        size: '18px', // 1.125rem
        height: 1.5 // 27px
      },
      h4_xsmall: {
        size: '18px'
      },
      h4_small: {
        size: '22px'
      }
    },
    5: {
      medium: {
        size: '16px', // 1rem
        height: 1.5 // 24px
      }
    }
  },
  extend: () => `
    max-width: fit-content;
  `
}
