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
      h1Small: {
        size: '26px', // 2rem
        height: 1.1875 // 38px
      },
      h1Large: {
        size: '32px', // 2rem
        height: 1.1875 // 38px
      }
    },
    2: {
      medium: {
        size: '22px', // 1.375rem
        height: 1.18 // (approx)26px
      },
      h2Small: {
        size: '22px'
      },
      h2Large: {
        size: '26px', // 1.75rem
        height: 1.178 // (approx)33px
      }
    },
    3: {
      medium: {
        size: '20px', // 1.25rem
        height: 1.2 // 24px
      }
    },
    4: {
      medium: {
        size: '18px', // 1.125rem
        height: 1.5 // 27px
      },
      h4Small: {
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
